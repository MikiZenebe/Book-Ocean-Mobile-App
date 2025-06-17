import { Link } from "expo-router";
import { Text, View } from "react-native";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function Index() {
  const { user, token, checkAuth } = useAuthStore();

  console.log(user, token);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{user?.token}</Text>
      <Link href="/(auth)/signup">
        <Text>Signup</Text>
      </Link>
      <Link href="/(auth)">
        <Text>Login</Text>
      </Link>
    </View>
  );
}
