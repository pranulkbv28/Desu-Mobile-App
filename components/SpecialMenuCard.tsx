import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const SpecialMenuCard = ({
  image,
  name,
}: {
  image: ImageSourcePropType | undefined;
  name: string;
}) => {
  return (
    <View style={{ marginRight: 30 }}>
      <View>
        <Image
          source={image}
          style={{ width: 100, height: 100, borderRadius: 20 }}
        />
      </View>
      <Text
        style={{ textAlign: "center", marginTop: 10, color: `${Colors.gray}` }}
      >
        {name}
      </Text>
    </View>
  );
};

export default SpecialMenuCard;

const styles = StyleSheet.create({});
