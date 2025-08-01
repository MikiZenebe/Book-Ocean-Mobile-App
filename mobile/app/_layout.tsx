import SafeScreen from "@/components/SafeScreen";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments(); //to check where are we

  const { user, token, checkAuth } = useAuthStore();
  const [hasMounted, setHasMounted] = useState(false);

  const [fontsLoaded] = useFonts({
    "SpaceMono-Regular": require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  //handle navigation based on the auth state
  useEffect(() => {
    if (!hasMounted || !segments[0]) return;

    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;

    if (!isSignedIn && !inAuthScreen) router.replace("/(auth)");
    else if (isSignedIn && inAuthScreen) router.replace("/(tabs)");
  }, [user, token, segments, hasMounted]);

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>

      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
