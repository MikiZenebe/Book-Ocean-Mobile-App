import { View, Text } from "react-native";
import React, { useState } from "react";

export default function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  return (
    <View>
      <Text>OnboardingScreen</Text>
    </View>
  );
}
