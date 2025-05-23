import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  brandSection: {
    alignItems: "center",
    marginTop: height * 0.12,
  },

  loginContainer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "rgba(74,222,128,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  appName: {
    fontSize: 42,
    fontWeight: "700",
    color: COLORS.primary,
    letterSpacing: 0.5,
    marginBottom: 0,
    textAlign: "center",
  },

  tagLine: {
    fontSize: 16,
    color: COLORS.grey,
    letterSpacing: 1,
    textTransform: "lowercase",
  },

  illustration: {
    width: width * 1,
    height: height * 1,
    maxHeight: 250,
  },

  illustrationConatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },

  loginSection: {
    width: "100%",
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: "center",
  },

  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginBottom: 20,
    width: "100%",
    maxWidth: 300,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },

  googleIconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  googleBtnTxt: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },

  termsTxt: {
    textAlign: "center",
    fontSize: 12,
    color: COLORS.grey,
    maxWidth: 280,
  },
});
