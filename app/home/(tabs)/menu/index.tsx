import { View, Text, Pressable, Button } from "react-native";
import React from "react";
import { clearData, retrieveData } from "@/utils/AsyncStorage";

const index = () => {
  const data = retrieveData();
  console.log("This is the data in menu: ", data);

  return (
    <View>
      <Pressable onPress={() => clearData()}>
        <Button title="Clear Order" />
      </Pressable>
    </View>
  );
};

export default index;
