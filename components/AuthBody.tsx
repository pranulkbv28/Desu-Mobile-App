import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSegments } from "expo-router";
import Foundation from "@expo/vector-icons/Foundation";
import { Colors } from "@/constants/Colors";

const AuthBody = ({ children }: { children: React.ReactNode }) => {
  const segments = useSegments();
  const currentPath = segments.join("/");

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            color: `${Colors.white.background}`,
          }}
        >
          {currentPath.includes("sign-up")
            ? "Sign Up"
            : currentPath.includes("otp")
            ? "Account Verification"
            : "Log In"}
        </Text>
        <Foundation name="paw" size={40} color={Colors.white.background} />
      </View>
      <View style={{ marginTop: 20 }}>{children}</View>
    </View>
  );
};

export default AuthBody;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: 20,
    backgroundColor: "inherit",
  },
});
