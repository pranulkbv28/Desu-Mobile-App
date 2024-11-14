import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import restaurantData from "@/data/restaurantData";
import AppHeader from "@/components/AppHeader";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import OrderDetailContainer from "@/components/OrderDetailContainer";
import { useDispatch } from "react-redux";
import { setOrderDetails } from "@/features/orderSlice/orderSlice";
import { retrieveData, storeData } from "@/utils/AsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define types for restaurant and dish data
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
  const dispatch = useDispatch();
  const [asyncStoreData, setAsyncStoreData] = useState({
    restaurantId: Number("") || undefined,
    restaurantName: String("") || undefined,
    orders: [] as any[],
  });

  const restaurant: Restaurant | undefined = restaurantData.find(
    (item) => item.id === Number(id)
  );

  // State to track the quantities for each dish
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    restaurant?.menu.reduce((acc, dish) => {
      acc[dish.id] = 0; // Initial quantity is 1 for each dish
      // console.log("This is acc: ", acc);
      return acc;
    }, {} as { [key: number]: number }) || {}
  );

  useEffect(() => {
    console.log("Entering 2nd UseEffect");

    const checkToUpdate = async () => {
      const data = await retrieveData();
      if (data) {
        console.log("Some data: ", data);
        setAsyncStoreData(data);
        console.log("Data.restaurantId: ", data.restaurantId);
        console.log("Number(id): ", Number(id));
        if (data.restaurantId === Number(id)) {
          if (data.orders.length >= 0) {
            console.log("This is toUpdate: ", true);

            const updation = async () => {
              const orderArray = Object.entries(quantities).map(
                ([key, value]) => ({
                  key,
                  value,
                })
              );

              const newOrderArray = orderArray.filter((ele) => ele.value >= 1);

              dispatch(
                setOrderDetails({
                  restaurantId: restaurant?.id,
                  restaurantName: restaurant?.name,
                  orders: newOrderArray,
                })
              );

              await storeData({
                restaurantId: restaurant?.id,
                restaurantName: restaurant?.name,
                orders: newOrderArray,
              });

              console.log("Showing this log: ", {
                restaurantId: restaurant?.id,
                restaurantName: restaurant?.name,
                orders: newOrderArray,
              });
            };

            updation();
          }
        }
      }
    };

    checkToUpdate();
  }, [quantities]);

  // Handler to update quantity
  const handleQuantityChange = (
    dishId: number,
    type: "increment" | "decrement"
  ) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [dishId]: Math.max(
        0,
        prevQuantities[dishId] + (type === "increment" ? 1 : -1)
      ),
    }));
  };

  // useEffect(() => {
  //   console.log(quantities);
  // }, [quantities]);

  if (!restaurant) {
    return (
      <View style={styles.container}>
        <Text>Restaurant not found</Text>
      </View>
    );
  }

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
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Image
            source={restaurant.menu[0].image}
            style={styles.restaurantImage}
          />
          <View style={styles.overlay}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.restaurantDescription}>
              "{restaurant.description}"
            </Text>
            <Text style={styles.restaurantLocation}>{restaurant.location}</Text>
            <Text style={styles.restaurantPriceForTwo}>
              Price for Two: {restaurant.priceForTwo}
            </Text>
          </View>
        </View>

        {restaurant.menu.map((dish) => (
          <View key={dish.id} style={styles.dishContainer}>
            <View style={styles.dishImageContainer}>
              <Image source={dish.image} style={styles.dishImage} />
            </View>
            <View style={styles.dishDetailsContainer}>
              <Text style={styles.dishName}>{dish.name}</Text>
              <Text style={styles.dishDescription}>{dish.description}</Text>
              <View style={styles.dishOrderDetailsContainer}>
                <Text style={styles.dishPrice}>{dish.price}</Text>
                <View style={styles.ordervalueContainer}>
                  <Pressable
                    onPress={() => handleQuantityChange(dish.id, "decrement")}
                  >
                    <Text style={styles.orderQty}>-</Text>
                  </Pressable>
                  <Text style={styles.orderAmount}>{quantities[dish.id]}</Text>
                  <Pressable
                    onPress={() => handleQuantityChange(dish.id, "increment")}
                  >
                    <Text style={styles.orderQty}>+</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      {asyncStoreData?.orders?.length >= 1 ? <OrderDetailContainer /> : null}
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
