import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useSelector } from "react-redux";

const OrderDetailContainer = () => {
  const orders = useSelector((state: any) => state.order.orderDetails);

  const totalItems = orders.orders
    .map((ele: any) => ele["value"])
    .reduce((acc: any, ele: any) => acc + ele, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        You have ordered <Text style={styles.highlight}>{totalItems}</Text>{" "}
        items
      </Text>
    </View>
  );
};

export default OrderDetailContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white.background,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    margin: 20,
  },
  text: {
    fontSize: 18,
    color: Colors.gray,
  },
  highlight: {
    fontWeight: "bold",
    color: Colors.appGreen,
  },
});
