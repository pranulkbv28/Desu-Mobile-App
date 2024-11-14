import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (orderDetails: any) => {
  try {
    await AsyncStorage.setItem("orderDetails", JSON.stringify(orderDetails));
  } catch (error) {
    console.error("Error storing data:", error);
  }
};

export const retrieveData = async () => {
  try {
    const storedData = await AsyncStorage.getItem("orderDetails");
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
};

export const clearData = async () => {
  try {
    await AsyncStorage.removeItem("orderDetails");
  } catch (error) {
    console.error("Error clearing data:", error);
  }
};
