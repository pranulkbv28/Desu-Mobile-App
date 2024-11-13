import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import restaurantData from "@/data/restaurantData";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";

const index = () => {
  console.log(restaurantData);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Filters</Text>
        <View style={styles.iconContainer}>
          <Ionicons name="filter-outline" size={24} color="black" />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {restaurantData.map((restaurant) => (
          <View
            style={{
              // borderWidth: 1,
              // borderColor: Colors.white.text,
              // padding: 10,
              width: "100%",
              height: 200,
              marginBottom: 30,
              // borderRadius: 10,
              position: "relative",
            }}
            key={restaurant.id}
          >
            <Image
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
              source={restaurant.menu[0].image}
            />
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                backgroundColor: "rgba(128, 128, 128, 0.7)", // Adjust 0.5 for more/less transparency
              }}
            >
              <View
                style={{
                  position: "absolute",
                  bottom: 10,
                  // left: 10,
                  // color: "white",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingHorizontal: 20,
                }}
              >
                <View>
                  <Text
                    style={{
                      color: `${Colors.white.background}`,
                      fontSize: 30,
                      fontWeight: "bold",
                    }}
                  >
                    {restaurant.name}
                    {/* {"\n"}
                Price for two: 
                {"\n"}
                Rating: {restaurant.stars} ⭐{"\n"}
                Distance: 
                {"\n"}
                Location: {restaurant.location} */}
                  </Text>
                  <Text
                    style={{
                      color: `${
                        Number(restaurant.distanceFromYou.replace(" km", "")) <
                        3
                          ? "lightgreen"
                          : Number(
                              restaurant.distanceFromYou.replace(" km", "")
                            ) < 6
                          ? "orange"
                          : "red"
                      }`,
                    }}
                  >
                    {restaurant.distanceFromYou}
                  </Text>
                  <Text
                    style={{
                      color: `${Colors.white.background}`,
                      fontSize: 20,
                      fontWeight: "semibold",
                    }}
                  >
                    {restaurant.priceForTwo} for two
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: `${Colors.white.background}`,
                      fontSize: 20,
                    }}
                  >
                    {restaurant.stars}
                  </Text>
                  <AntDesign name="star" size={24} color="yellow" />
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white.text,
  },
  iconContainer: {},
});
