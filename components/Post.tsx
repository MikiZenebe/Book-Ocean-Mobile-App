import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { styles } from "@/styles/feedStyles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";

export default function Post({ post }: any) {
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
          <Text style={styles.timeAgo}>2 hours ago</Text>
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
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="chatbubble-outline" size={22} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={22} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="trash-outline" size={22} />
        </TouchableOpacity>
      </View>

      <View style={styles.postInfo}>
        <Text style={styles.likesText}>Be the fisrt to like</Text>
        {post.caption && (
          <View style={styles.captionContainer}>
            <Text style={styles.captionUsername}>{post.author.username}</Text>
            <Text style={styles.captionText}>{post.caption}</Text>
          </View>
        )}

        <TouchableOpacity>
          <Text style={styles.commentText}>View all 2 comments</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
