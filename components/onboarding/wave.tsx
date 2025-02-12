import { View, Text } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function Wave() {
  return (
    <View>
      <Text>wave</Text>
    </View>
  );
}
