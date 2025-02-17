import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { fontSizes, windowHeight, windowWidth } from "@/themes/app.constant";

export default function AuthModal() {
  return (
    <BlurView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // Ensure it takes up the full screen
      }}
    >
      <Pressable
        style={{
          borderRadius: 30,
          backgroundColor: "#fff",
          height: windowHeight(250),
          width: windowWidth(420),
          top: 300,
          left: 160,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={(e) => e.stopPropagation()} // Prevent the modal from closing if clicked inside
      >
        <Text
          style={{
            fontSize: fontSizes.FONT35,
            fontFamily: "Poppins_700Bold",
          }}
        >
          Join to Etcodemy
        </Text>
        <Text
          style={{
            fontSize: fontSizes.FONT18,
            paddingTop: windowHeight(5),
            fontFamily: "Poppins_300Light",
          }}
        >
          It's easier than your imagination!
        </Text>

        <View
          style={{
            paddingVertical: windowHeight(10),
            flexDirection: "row",
            gap: windowWidth(20),
          }}
        >
          <Pressable>
            {" "}
            <Image
              source={require("@/assets/images/onboarding/google.png")}
              style={{
                width: windowWidth(40),
                height: windowHeight(40),
                resizeMode: "contain",
              }}
            />
          </Pressable>
          <Pressable>
            {" "}
            <Image
              source={require("@/assets/images/onboarding/github.png")}
              style={{
                width: windowWidth(40),
                height: windowHeight(40),
                resizeMode: "contain",
              }}
            />
          </Pressable>
          <Pressable>
            {" "}
            <Image
              source={require("@/assets/images/onboarding/apple.png")}
              style={{
                width: windowWidth(40),
                height: windowHeight(40),
                resizeMode: "contain",
              }}
            />
          </Pressable>
        </View>
      </Pressable>
    </BlurView>
  );
}
