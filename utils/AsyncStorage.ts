import AsyncStorage from "@react-native-async-storage/async-storage";

const storeOrderDetails = async (orderDetails: any) => {
  try {
    await AsyncStorage.setItem("orderDetails", JSON.stringify(orderDetails));
  } catch (error) {
    console.error("Error storing order details:", error);
  }
};

export { storeOrderDetails };
