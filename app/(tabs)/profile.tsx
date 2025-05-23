import { View, Text } from "react-native";
import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

export default function ProfileScreen() {
  const { signOut, userId } = useAuth();
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const currentUser = useQuery(
    api.users.getUserByClerkId,
    userId ? { clerkId: userId } : "skip"
  );

  const [edselectedPost, setSelectedPost] = useState<Doc<"posts"> | null>(null);
  const posts = useQuery(api.posts.getPostsByUser, {});

  const updatedProfile = useMutation(api.users.updateProfile);

  const handleSaveProfile = async () => {};

  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
}
