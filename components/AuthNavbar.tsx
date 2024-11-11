import { useSegments } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import Foundation from "@expo/vector-icons/Foundation";
import logoImg from "@/assets/images/logoImg.png";
import { Colors } from "@/constants/Colors";

const AuthNavbar = () => {
  const segments = useSegments();
  const currentPath = segments.join("/");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Entypo name="dots-three-horizontal" size={40} color="#ffd200" />
        </View>
        <View style={styles.pawIconContainer}>
          <Foundation name="paw" size={100} color="#ffd200" />
        </View>
      </View>

      {/* Display the current path for debugging */}
      <View style={styles.logoContainer}>
        <Text style={styles.pathText}>
          {currentPath.includes("sign-up")
            ? "Welcome to"
            : currentPath.includes("otp")
            ? "Verify your email"
            : "Sign In to continue"}
        </Text>
        <Image source={logoImg} style={styles.logoImg} />
      </View>
    </View>
  );
};

export default AuthNavbar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e7f0f1",
    padding: 30,
    paddingTop: 50,
    height: 420,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pawIconContainer: {
    transform: [{ rotate: "240deg" }],
    position: "absolute",
    right: "-10%",
    top: "-100%",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  pathText: {
    // marginTop: 20,
    fontSize: 26,
    color: Colors.white.text,
    fontWeight: "bold",
  },
  logoImg: {
    width: 200,
    height: 200,
  },
});
