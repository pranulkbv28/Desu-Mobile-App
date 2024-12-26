import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

const Index = () => {
  const router = useRouter();
  const currentOrder = useSelector((state: any) => state.newOrder.orderDetails);

  console.log("This is the current order in checkout", currentOrder);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push("/home")}
        style={styles.homeIconContainer}
      >
        <Entypo
          style={{ textAlign: "center" }}
          name="home"
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0cc0df",
    flex: 1,
    padding: 20,
  },
  homeIconContainer: {
    backgroundColor: Colors.white.background,
    height: 38,
    width: 38,
    borderRadius: 99,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Index;
