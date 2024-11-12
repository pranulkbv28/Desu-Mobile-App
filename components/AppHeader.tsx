import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useSegments } from "expo-router";
import ImageCarousel from "@/components/ImageCarousel";
import { useSelector } from "react-redux";

const AppHeader = () => {
  const segments = useSegments();
  const currentPath = segments.join("/");

  console.log(currentPath);

  const isScrolling = useSelector((state: any) => state.scroll.isScrolling);

  const [showComponent, setShowComponent] = useState(isScrolling);

  useEffect(() => {
    // console.log({ isScrolling });
    isScrolling ? setShowComponent(true) : setShowComponent(false);
    console.log(showComponent);
  }, [isScrolling]);

  return (
    <View style={styles.container}>
      {/* {isScrolling && (
        
      )} */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <AntDesign name="user" size={14} color={Colors.white.background} />
        </View>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>DESU</Text>
          <Text style={styles.logoSubtitle}>A Pet Diet</Text>
        </View>
        <Entypo name="menu" size={24} color={Colors.white.background} />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput style={styles.textInput} placeholder="Search for food" />
        <View style={styles.searchIconContainer}>
          <AntDesign name="search1" size={24} color="black" />
        </View>
      </View>
      {currentPath === "home" && <ImageCarousel />}
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appGreen,
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 20,
    // marginBottom: -70,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.white.background,
    borderRadius: 99,
    padding: 5,
  },
  logoContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  logoText: {
    fontWeight: "bold",
    fontSize: 20,
    color: Colors.white.background,
  },
  logoSubtitle: {
    color: Colors.white.background,
  },
  textInputContainer: {
    position: "relative",
    marginTop: 20,
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: Colors.white.background,
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 60,
    width: "100%",
    borderRadius: 10,
  },
  searchIconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  // carouselContainer: {
  //   marginBottom: -30, // Pulls the carousel up to give it a half-on, half-off look
  //   // paddingBottom: 20, // Extra space to ensure dots are visible
  //   position: "relative",
  //   zIndex: 1,
  //   // bottom: -10,
  // },
});
