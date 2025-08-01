import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import { baseUrl } from "@/constants/baseUrl";
import ProfileHeader from "@/components/ProfileHeader";
import LogoutButton from "@/components/LogoutButton";
import styles from "@/styles/profileStyle";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/color";
import { Image } from "expo-image";
import Loader from "@/components/Loader";

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
  const [deleteBookId, setDeleteBookId] = useState<null | string>(null);

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

      setBooks(data?.books);
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

  const handleDeleteBook = async (bookId: string) => {
    try {
      setDeleteBookId(bookId);
      const response = await fetch(`${baseUrl}/api/books/${bookId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to delete book");

      setBooks(books.filter((book) => book._id !== bookId));
      Alert.alert("Success", "Recommendation deleted successfully");
    } catch (error) {
      const err = error as Error;
      Alert.alert("Error", err.message || "Failed to delete recommendation");
    } finally {
      setDeleteBookId(null);
    }
  };

  const confirmDelete = (bookId: string) => {
    Alert.alert(
      "Delete Recommednation",
      "Are you sure you want to delete this recommendation?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => handleDeleteBook(bookId) },
      ]
    );
  };

  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={16}
          color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          style={{ marginRight: 2 }}
        />
      );
    }
    return <View style={{ flexDirection: "row" }}>{stars}</View>;
  };

  const renderBookItem = ({ item }: any) => (
    <View style={styles.bookItem}>
      <Image source={item.image} style={styles.bookImage} />

      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>
          {renderRatingStars(item.rating)}
        </View>

        <Text style={styles.bookCaption} numberOfLines={2}>
          {item.caption}
        </Text>

        <Text style={styles.bookDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => confirmDelete(item._id)}
      >
        {deleteBookId === item._id ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <Ionicons name="trash-outline" size={20} color={COLORS.primary} />
        )}
      </TouchableOpacity>
    </View>
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchBooks();
    setRefreshing(false);
  };

  if (loading && !refreshing) return <Loader size="large" />;

  return (
    <View style={styles.container}>
      <ProfileHeader />
      <LogoutButton />

      {/* Recommendation */}
      <View style={styles.booksHeader}>
        <Text style={styles.booksTitle}>Your Recommendations</Text>
        <Text style={styles.booksCount}>{books.length} books</Text>
      </View>

      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.booksList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="book-outline"
              size={50}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyText}>No recommendations yet</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/create")}
            >
              <Text style={styles.addButtonText}>Add Your First Book</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}
