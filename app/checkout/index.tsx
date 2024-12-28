import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import restaurantData from "@/data/restaurantData";
import dishData from "@/data/dishData";

const Index = () => {
  const router = useRouter();
  const currentOrder = useSelector((state: any) => state.newOrder);

  console.log("This is the current order in checkout: ", currentOrder);
  console.log(
    "This is the current order in checkout with orderDetails: ",
    currentOrder.orderDetails
  );

  function getDishData(dishId: number) {
    return dishData.find((dish) => dish.id === dishId);
  }

  const dish = getDishData(currentOrder.orderDetails[0].dish.id);

  console.log("This is the dish in checkout: ", dish);

  function getSubTotal() {
    let subTotal = 0;
    currentOrder.orderDetails.forEach((order: any) => {
      const dishPrice = Number(order.dish.price.replace("₹", ""));
      subTotal += dishPrice * order.quantity;
    });
    return subTotal;
  }

  console.log("This is the subTotal in checkout: ", getSubTotal());

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
      <ScrollView style={styles.scrollContainer}>
        {currentOrder.orderDetails.map((order: any) => (
          <View style={styles.dishContainer} key={order.dish.id}>
            <View style={styles.imageContainer}>
              <Image source={order.dish.image} style={styles.image} />
            </View>
            <View style={styles.dishDetailsContainer}>
              <View style={styles.dishDetails}>
                <Text style={{ fontWeight: "bold" }}>{order.dish.name}</Text>
                <Text style={{ fontWeight: "light", color: "#515151" }}>
                  {order.dish.price}
                </Text>
              </View>
              <View style={styles.quantityContainer}>
                <Text>
                  {order.quantity > 1
                    ? `${order.quantity} Numbers`
                    : `${order.quantity} Number`}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.paymentDetailsContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>
          Payment Details
        </Text>
        <View>
          <View style={styles.paymentDetails}>
            <Text style={styles.chargesText}>Sub Total</Text>
            <Text style={styles.chargesText}>{`₹${getSubTotal().toFixed(
              2
            )}`}</Text>
          </View>
          <View style={styles.paymentDetails}>
            <Text style={styles.chargesText}>Delivery Fee</Text>
            <Text style={styles.chargesText}>₹10</Text>
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>
              {(getSubTotal() + 10).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Proceed to Payment</Text>
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
  scrollContainer: {
    padding: 10,
    flex: 1,
    // backgroundColor: "red",
    height: "50%",
    marginTop: 50,
    marginBottom: 20,
  },
  dishContainer: {
    backgroundColor: Colors.white.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.white.text,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
    padding: 10,
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  dishDetailsContainer: {
    // width: "60%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
  },
  dishDetails: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentDetailsContainer: {
    borderWidth: 3,
    borderColor: Colors.white.text,
    borderRadius: 10,
    padding: 10,
    backgroundColor: Colors.white.background,
    marginBottom: 100,
  },
  paymentDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  chargesText: {
    fontWeight: "light",
    color: "#515151",
  },
  totalContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  totalText: {
    fontWeight: "bold",
    color: Colors.white.text,
    fontSize: 20,
  },
  btn: {
    backgroundColor: "#ffde59",
    width: "100%",
    borderWidth: 2,
    borderColor: Colors.white.text,
    padding: 10,
    borderRadius: 10,
    marginBottom: 100,
  },
  btnText: {
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.white.text,
  },
});

export default Index;
