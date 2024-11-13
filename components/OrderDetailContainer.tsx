import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useSelector } from "react-redux";

const OrderDetailContainer = () => {
  const orders = useSelector((state: any) => state.order.orderDetails);

  console.log(
    "This is the orders in OrderDetailContainer: ",
    orders.orders.length
  );

  return (
    <View style={styles.container}>
      <Text>You have ordered {orders.orders.length} items</Text>
    </View>
  );
};

export default OrderDetailContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white.background,
    padding: 30,
  },
});
