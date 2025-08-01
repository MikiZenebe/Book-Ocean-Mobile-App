import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import { baseUrl } from "@/constants/baseUrl";
import ProfileHeader from "@/components/ProfileHeader";
import LogoutButton from "@/components/LogoutButton";

interface Book {
  rating: any;
  title: string;
  caption: string;
  createdAt: string;
  _id: string;
  user: {
    profileImage: string;
    username: string;
  };
  image: any; // Replace 'any' with the correct type if known (e.g., ImageSourcePropType)
}

export default function Profile() {
  const { token } = useAuthStore();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const router = useRouter();

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${baseUrl}/api/books/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch user books");

      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
      Alert.alert("Error", "Failed to load profile data. Pull fown to refresh");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <View>
      <ProfileHeader />
      <LogoutButton />
    </View>
  );
}
