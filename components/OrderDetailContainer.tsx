import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";

const OrderDetailContainer = ({
  page,
  restaurantId,
  currentOrderRestaurantId,
}: {
  page?: string;
  restaurantId?: number;
  currentOrderRestaurantId?: number;
}) => {
  const orders = useSelector((state: any) => state.order.orderDetails);
  const newOrders = useSelector((state: any) => state.newOrder);
  const [message, setMessage] = useState("");

  const router = useRouter();

  console.log("This is the new order in OrderDetails: ", newOrders);
  console.log("Testing: ", Object.keys(newOrders));
  console.log("This is restaurantId in OrderDetails: ", restaurantId);
  console.log(
    "This is currentOrderRestaurantId in OrderDetails: ",
    currentOrderRestaurantId
  );

  const totalItems = orders.orders
    .map((ele: any) => ele["value"])
    .reduce((acc: any, ele: any) => acc + ele, 0);

  const totalQuantity = newOrders.orderDetails
    .map((ele: any) => ele.quantity)
    .reduce((total: any, dishQty: any) => total + dishQty, 0);

  const handlePress = () => {
    if (restaurantId && currentOrderRestaurantId) {
      if (restaurantId === currentOrderRestaurantId) {
        console.log("Entering null if statement");
        setMessage("Go to Checkout");
        null;
      } else {
        console.log("Entering else statement after null if");
        setMessage("Go to Restaurant");
        router.push(`/restaurants/${currentOrderRestaurantId}`);
      }
    } else {
      if (page === "home") {
        console.log("Entering home if statement");
        setMessage("Go to Restaurant");
        router.push(`/restaurants/${currentOrderRestaurantId}`);
      } else {
        console.log("Entering home else statement");
        setMessage("Something went wrong");
      }
    }
  };

  useEffect(() => {
    console.log("This is message: ", message);
  }, [message]);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text style={styles.text}>
        You have ordered <Text style={styles.highlight}>{totalQuantity}</Text>{" "}
        items
      </Text>
      <Text style={styles.text}>
        {restaurantId && currentOrderRestaurantId
          ? restaurantId === currentOrderRestaurantId
            ? "Go to Checkout"
            : "Go to Restaurant"
          : page === "home"
          ? "Go to Restaurant"
          : "Something went wrong"}
      </Text>
    </TouchableOpacity>
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
