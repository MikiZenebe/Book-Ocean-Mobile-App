import { View, Text, Alert, TouchableOpacity } from "react-native";
import React from "react";
import { useAuthStore } from "@/store/authStore";
import styles from "@/styles/profileStyle";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/color";

export default function LogoutButton() {
  const { logout } = useAuthStore();

  const confirmLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => logout(), style: "destructive" },
    ]);
  };

  return (
    <TouchableOpacity onPress={confirmLogout} style={styles.logoutButton}>
      <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
}
