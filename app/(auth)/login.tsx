import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "@/styles/authStyles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { useSSO } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("Error starting SSO flow: ", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* BRAND SECTION */}
      <View style={styles.brandSection}>
        <View style={styles.loginContainer}>
          <Ionicons name="leaf" size={32} color={COLORS.primary} />
        </View>

        <Text style={styles.appName}>Habgram</Text>
        <Text style={styles.tagLine}>don't miss anything</Text>
      </View>

      <View style={styles.illustrationConatiner}>
        <Image
          source={require("@/assets/images/auth.jpg")}
          style={styles.illustration}
          resizeMode="cover"
        />
      </View>

      <View style={styles.loginSection}>
        <TouchableOpacity
          style={styles.googleButton}
          activeOpacity={0.9}
          onPress={handleGoogleSignIn}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons name="logo-google" size={20} color="white" />
          </View>
          <Text style={styles.googleBtnTxt}>Continue with Google</Text>
        </TouchableOpacity>

        <Text style={styles.termsTxt}>
          By continuing, you agree to our Terms and Privacy Policy
        </Text>
      </View>
    </View>
  );
}
