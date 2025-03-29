import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { styles } from "@/styles/feedStyles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import CommentsModal from "./CommentsModal";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@clerk/clerk-expo";

type PostProps = {
  post: {
    _id: Id<"posts">;
    imageUrl: string;
    caption?: string;
    likes: number;
    comments: number;
    _creationTime: number;
    isLiked: boolean;
    isBookmarked: boolean;
    author: { _id: string; fullname: string; username: string; image: string };
  };
};

export default function Post({ post }: PostProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
  const [likeCount, setIsLikeCount] = useState(post.likes);
  const [commentCount, setIsCommentCount] = useState(post.comments);
  const [showComments, setShowComments] = useState(false);

  const { user } = useUser();
  const currentUser = useQuery(
    api.users.getUserByClerkId,
    user ? { clerkId: user.id } : "skip"
  );

  const toggleLike = useMutation(api.posts.toogleLike);
  const toogleBookmark = useMutation(api.bookmarks.toogleBookmark);
  const deletePost = useMutation(api.posts.deletePost);

  const handleLike = async () => {
    try {
      const newIsLiked = await toggleLike({ postId: post._id });
      setIsLiked(newIsLiked);
      setIsLikeCount((prev) => (newIsLiked ? prev + 1 : prev - 1));
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleBookmark = async () => {
    const newIsBookmarked = await toogleBookmark({ postId: post._id });
    setIsBookmarked(newIsBookmarked);
  };

  const handleDelete = async () => {
    try {
      await deletePost({ postId: post._id });
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <Link href={"/(tabs)/notifications"}>
          <TouchableOpacity style={styles.postHeaderLeft}>
            <Image
              source={post.author.image}
              style={styles.postAvatar}
              contentFit="cover"
              transition={200}
              cachePolicy="memory-disk"
            />
            <View>
              <Text style={styles.postFullname}>{post.author.fullname}</Text>
              <Text style={styles.postUsername}>@{post.author.username}</Text>
            </View>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity>
          <Text style={styles.timeAgo}>
            {formatDistanceToNow(post._creationTime, { addSuffix: true })}
          </Text>
          {/* <Ionicons name="trash-outline" size={20} color={COLORS.primary} /> */}
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: post.imageUrl }}
        style={styles.postImage}
        contentFit="cover"
        transition={200}
        cachePolicy="memory-disk"
      />

      <View style={styles.postActions}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
          onPress={handleLike}
        >
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={20}
            color={isLiked ? COLORS.primary : "black"}
          />
          <Text>
            {likeCount} {likeCount >= 2 ? "likes" : "like"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
          onPress={() => setShowComments(true)}
        >
          <Ionicons name="chatbubble-outline" size={20} />
          <Text>
            {commentCount} {commentCount >= 2 ? "comments" : "comment"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleBookmark}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Ionicons
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={20}
            color={isBookmarked ? COLORS.primary : "black"}
          />
          <Text>{isBookmarked ? "bookmarked" : "bookmark"}</Text>
        </TouchableOpacity>

        {post.author._id === currentUser?._id ? (
          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name="trash-outline" size={20} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={20} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.postInfo}>
        {likeCount <= 0 && (
          <Text style={styles.likesText}>Be the fisrt to like</Text>
        )}
        {post.caption && (
          <View style={styles.captionContainer}>
            <Text style={styles.captionUsername}>{post.author.username}</Text>
            <Text style={styles.captionText}>{post.caption}</Text>
          </View>
        )}
      </View>

      <CommentsModal
        postId={post._id}
        visible={showComments}
        onClose={() => setShowComments(false)}
        onCommentAdded={() => setIsCommentCount((prev) => prev + 1)}
      />
    </View>
  );
}
