import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  Button,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrder,
  addItemToOrder,
  removeItemFromOrder,
} from "@/features/orderSlice/newOrderSlice";
import { useRouter, useLocalSearchParams, useSegments } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import OrderDetailContainer from "@/components/OrderDetailContainer";
import restaurantData from "@/data/restaurantData";
import AppHeader from "@/components/AppHeader";

type Dish = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: any;
};

type Restaurant = {
  id: number;
  name: string;
  description: string;
  location: string;
  priceForTwo: string;
  menu: Dish[];
};

const Index = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log("This is id: ", id);
  const router = useRouter();
  // const segments = useSegments();
  // const currentPath = segments.join("/");
  const dispatch = useDispatch();
  const currentOrder = useSelector((state: any) => state.newOrder);

  // console.log("Current Path from Restaurant details: ", currentPath);

  const restaurant: Restaurant | undefined = restaurantData.find(
    (item) => item.id === Number(id)
  );

  console.log(
    "This is newOrder in Restaurant Index: ",
    currentOrder.orderDetails
  );
  console.log("This is restaurant: ", restaurant);

  // State to track the quantities for each dish
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    restaurant?.menu.reduce((acc, dish) => {
      // console.log("This is acc in acc: ", acc);
      // console.log("This is dish in acc: ", dish);
      // console.log("This is acc[dish.id] in acc: ", acc[dish.id]);
      acc[dish.id] = 0; // Initial quantity is 0 for each dish
      return acc;
    }, {} as { [key: number]: number }) || {}
  );

  // Handler to update quantity
  const handleQuantityChange = (dishId: number, quantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [dishId]: quantity,
    }));

    console.log("This is current order: ", currentOrder.restaurantId);
    console.log("This is restaurant id: ", restaurant?.id);
    // console.log(
    //   "Checking if the restaurant ID is different: ",
    //   currentOrder.restaurantId === String(restaurant?.id)
    // );

    // If the restaurant ID is different, update the order
    if (currentOrder.restaurantId !== String(restaurant?.id)) {
      // console.log("Entering if in handleQuantityChange");
      dispatch(
        setOrder({ restaurantId: String(restaurant?.id), orderDetails: [] })
      );
    }

    // console.log("This is quantity in handleQuantity: ", quantity);
    // Add item to order if quantity is greater than 0
    if (quantity > 0) {
      const dish = restaurant?.menu.find((item) => item.id === dishId);
      console.log("This is dish: ", dish);
      if (dish) {
        dispatch(addItemToOrder({ dish, quantity }));
      }
    } else {
      // Remove item from order if quantity is 0
      dispatch(removeItemFromOrder(dishId));
    }
  };

  function getQuantity(dishName: string, dishId: number) {
    const dishIndex = currentOrder.orderDetails.findIndex(
      (ele: any) => ele.dish.id === dishId && ele.dish.name === dishName
    );
    if (dishIndex === -1) {
      return 0;
    } else {
      return currentOrder.orderDetails[dishIndex].quantity;
    }
  }

  // console.log("This is restaurantId in Index: ", restaurant?.id);
  // console.log(
  //   "This is currentOrderRestaurantId in Index: ",
  //   currentOrder.restaurantId
  // );

  return (
    <>
      <AppHeader />
      <View style={styles.headerContainer}>
        <Pressable style={styles.iconContainer} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={16} color="black" />
        </Pressable>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for your pet's favourite food here!!"
          />
        </View>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Image
            source={restaurant?.menu[0].image}
            style={styles.restaurantImage}
          />
          <View style={styles.overlay}>
            <Text style={styles.restaurantName}>{restaurant?.name}</Text>
            <Text style={styles.restaurantDescription}>
              "{restaurant?.description}"
            </Text>
            <Text style={styles.restaurantLocation}>
              {restaurant?.location}
            </Text>
            <Text style={styles.restaurantPriceForTwo}>
              Price for Two: {restaurant?.priceForTwo}
            </Text>
          </View>
        </View>

        {restaurant?.menu.map((dish) => (
          <View key={dish.id} style={styles.dishContainer}>
            <View style={styles.dishImageContainer}>
              <Image source={dish.image} style={styles.dishImage} />
            </View>
            <View style={styles.dishDetailsContainer}>
              <Text style={styles.dishName}>{dish.name}</Text>
              <Text style={styles.dishDescription}>{dish.description}</Text>
              <View style={styles.dishOrderDetailsContainer}>
                <Text style={styles.dishPrice}>{dish.price}</Text>
                <View
                  style={
                    getQuantity(dish.name, dish.id) > 0
                      ? styles.ordervalueContainer
                      : styles.ordervalueContainerNull
                  }
                >
                  <Button
                    title="Add"
                    onPress={() =>
                      handleQuantityChange(
                        dish.id,
                        getQuantity(dish.name, dish.id) + 1
                      )
                    }
                  />
                  <Text>{getQuantity(dish.name, dish.id)}</Text>
                  <Button
                    title="Remove"
                    onPress={() =>
                      handleQuantityChange(
                        dish.id,
                        Math.max(getQuantity(dish.name, dish.id) - 1, 0)
                      )
                    }
                  />
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      {currentOrder?.orderDetails?.length > 0 ? (
        <OrderDetailContainer
          restaurantId={restaurant?.id}
          currentOrderRestaurantId={Number(currentOrder.restaurantId)}
        />
      ) : null}
    </>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 200 },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
  },
  iconContainer: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.white.text,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  searchInputContainer: {
    flex: 1,
  },
  searchInput: {
    color: Colors.white.background,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.white.text,
  },
  titleContainer: {
    borderRadius: 10,
    height: 200,
    width: "100%",
    marginBottom: 30,
  },
  restaurantImage: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    padding: 10,
    borderRadius: 10,
  },
  restaurantName: {
    color: Colors.white.background,
    fontSize: 40,
    fontWeight: "bold",
    position: "absolute",
    top: 5,
    textAlign: "center",
    width: "100%",
  },
  restaurantDescription: {
    color: Colors.white.background,
    fontSize: 20,
    fontWeight: "semibold",
    position: "absolute",
    top: 70,
    textAlign: "center",
    width: "100%",
    fontStyle: "italic",
  },
  restaurantLocation: {
    color: Colors.white.background,
    fontStyle: "italic",
    fontWeight: "semibold",
    fontSize: 18,
  },
  restaurantPriceForTwo: {
    color: Colors.white.background,
  },
  dishContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 30,
    padding: 10,
    backgroundColor: Colors.white.background,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  dishImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
  },
  dishImage: { width: "100%", height: "100%" },
  dishDetailsContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    gap: 10,
  },
  dishName: { fontSize: 20, fontWeight: "bold" },
  dishDescription: { fontSize: 16, color: "gray" },
  dishOrderDetailsContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dishPrice: { fontSize: 24, color: "red" },
  ordervalueContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
  },
  ordervalueContainerNull: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "none",
    padding: 10,
    borderRadius: 8,
  },
  orderQty: {
    width: 20,
    height: 20,
    textAlign: "center",
    borderRadius: 15,
    backgroundColor: Colors.white.background,
    fontSize: 18,
  },
  orderAmount: {
    color: Colors.white.background,
  },
});
