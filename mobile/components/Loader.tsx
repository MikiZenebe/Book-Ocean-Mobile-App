import COLORS from "@/constants/color";
import React from "react";
import { ActivityIndicator, View } from "react-native";

interface loaderProp {
  size: number | "large" | "small" | undefined;
}

const Loader = ({ size = "large" }: loaderProp) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
      }}
    >
      <ActivityIndicator size={size} color={COLORS.primary} />
    </View>
  );
};

export default Loader;
