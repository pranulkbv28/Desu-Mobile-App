import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { useSelector } from "react-redux";
import { retrieveData } from "@/utils/AsyncStorage";

const OrderDetailContainer = () => {
  // const orders = useSelector((state: any) => state.order.orderDetails);

  const [orders, setOrders] = useState({
    restaurantId: Number("") || undefined,
    restaurantName: String("") || undefined,
    orders: [] as any[],
  });

  const stateData = useSelector((state: any) => state.order.orderDetails);

  const getData = async () => {
    const data = await retrieveData();
    console.log("This is the data: ", data);
    setOrders(data);
  };

  useEffect(() => {
    getData();
    console.log("This is the orders in OrderDetailContainer: ", orders);
  }, [stateData]);

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
