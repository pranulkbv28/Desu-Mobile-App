import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
  Animated,
} from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { setIsScrolling } from "@/features/scrollSlice/scrollSlice";
import SpecialMenuCard from "@/components/SpecialMenuCard";
import foodCard1 from "@/assets/images/foodCard1.png";
import foodCard2 from "@/assets/images/foodCard2.png";
import foodCard3 from "@/assets/images/foodCard3.png";
import deliveryCard from "@/assets/images/deliveryCard.png";
import { Colors } from "@/constants/Colors";
import { scrollY } from "@/constants/constants";

const Index = ({ carouselTranslateY }: { carouselTranslateY?: any }) => {
  const SCROLL_THRESHOLD = 100;

  const dispatch = useDispatch();

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > SCROLL_THRESHOLD) {
      dispatch(setIsScrolling(true)); // Hide header if scrolled past threshold
    } else {
      dispatch(setIsScrolling(false)); // Show header if within threshold
    }
  };

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Animated.ScrollView
          scrollEventThrottle={16}
          contentContainerStyle={styles.body}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ])}
        >
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <Text style={styles.text}>Special Menu</Text>
              <Text style={styles.text}>See All</Text>
            </View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              <SpecialMenuCard image={foodCard1} name={"Rice Bowl"} />
              <SpecialMenuCard image={foodCard2} name={"Breads"} />
              <SpecialMenuCard image={foodCard3} name={"Meat and Gravys"} />
              <SpecialMenuCard image={foodCard1} name={"Rice Bowl"} />
              <SpecialMenuCard image={foodCard2} name={"Breads"} />
              <SpecialMenuCard image={foodCard3} name={"Meat and Gravys"} />
            </ScrollView>
          </View>
          <View style={{ width: "100%", marginTop: 40, position: "relative" }}>
            <Image
              source={deliveryCard}
              style={{ width: "100%", height: 200, borderRadius: 20 }}
            />
            <Text
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                fontWeight: "bold",
                fontSize: 40,
              }}
            >
              Free Delivery Order
            </Text>
            <Text
              style={{
                position: "absolute",
                bottom: 10,
                left: 10,
                fontWeight: "semibold",
                fontSize: 20,
              }}
            >
              For Purchases over ₹999
            </Text>
          </View>
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <Text style={styles.text}>Special Menu</Text>
              <Text style={styles.text}>See All</Text>
            </View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              <SpecialMenuCard image={foodCard1} name={"Rice Bowl"} />
              <SpecialMenuCard image={foodCard2} name={"Breads"} />
              <SpecialMenuCard image={foodCard3} name={"Meat and Gravys"} />
              <SpecialMenuCard image={foodCard1} name={"Rice Bowl"} />
              <SpecialMenuCard image={foodCard2} name={"Breads"} />
              <SpecialMenuCard image={foodCard3} name={"Meat and Gravys"} />
            </ScrollView>
          </View>
          <View style={{ width: "100%", marginTop: 40, position: "relative" }}>
            <Image
              source={deliveryCard}
              style={{ width: "100%", height: 200, borderRadius: 20 }}
            />
            <Text
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                fontWeight: "bold",
                fontSize: 40,
              }}
            >
              Free Delivery Order
            </Text>
            <Text
              style={{
                position: "absolute",
                bottom: 10,
                left: 10,
                fontWeight: "semibold",
                fontSize: 20,
              }}
            >
              For Purchases over ₹999
            </Text>
          </View>
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <Text style={styles.text}>Special Menu</Text>
              <Text style={styles.text}>See All</Text>
            </View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              <SpecialMenuCard image={foodCard1} name={"Rice Bowl"} />
              <SpecialMenuCard image={foodCard2} name={"Breads"} />
              <SpecialMenuCard image={foodCard3} name={"Meat and Gravys"} />
              <SpecialMenuCard image={foodCard1} name={"Rice Bowl"} />
              <SpecialMenuCard image={foodCard2} name={"Breads"} />
              <SpecialMenuCard image={foodCard3} name={"Meat and Gravys"} />
            </ScrollView>
          </View>
          <View style={{ width: "100%", marginTop: 40, position: "relative" }}>
            <Image
              source={deliveryCard}
              style={{ width: "100%", height: 200, borderRadius: 20 }}
            />
            <Text
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                fontWeight: "bold",
                fontSize: 40,
              }}
            >
              Free Delivery Order
            </Text>
            <Text
              style={{
                position: "absolute",
                bottom: 10,
                left: 10,
                fontWeight: "semibold",
                fontSize: 20,
              }}
            >
              For Purchases over ₹999
            </Text>
          </View>
        </Animated.ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 90,
    // paddingBottom: 10,
  },
  body: {
    // flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  text: {
    // margin: 16,
    color: Colors.gray,
  },
});
