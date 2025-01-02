import React, { useEffect, useState } from "react";
import { Animated } from "react-native";
import { Colors } from "@/constants/Colors";
import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { StatusBar, StyleSheet } from "react-native";
import AppHeader from "@/components/AppHeader";
import { Provider, useSelector } from "react-redux";
import store from "@/store/store";
import OrderDetailContainer from "@/components/OrderDetailContainer";
import Index from "@/app/home";
import { scrollY } from "@/constants/constants";

export default () => {
  const orders = useSelector((state: any) => state.order.orderDetails);
  const newOrders = useSelector((state: any) => state.newOrder.orderDetails);

  console.log("This is the new order in Home: ", newOrders.length);

  const paddingForImageCarousel = 150;
  const heightScrollY = scrollY;
  const diffClamScrollY = Animated.diffClamp(
    heightScrollY,
    0,
    paddingForImageCarousel
  );
  const headerY = diffClamScrollY.interpolate({
    inputRange: [0, paddingForImageCarousel],
    outputRange: [0, -paddingForImageCarousel],
    extrapolate: "clamp",
  });

  return (
    <>
      <AppHeader
        paddingForImageCarousel={paddingForImageCarousel}
        headerY={headerY}
      />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.white.background,
          tabBarInactiveTintColor: Colors.gray,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors.appGreen,
            paddingBottom: 10,
            paddingTop: 10,
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Entypo name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(tabs)/list/index"
          options={{
            title: "List",
            tabBarLabel: "List",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="book-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(tabs)/menu/index"
          options={{
            title: "Menu",
            tabBarLabel: "Menu",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="bowl-food" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(tabs)/inbox/index"
          options={{
            title: "Inbox",
            tabBarLabel: "Inbox",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="mail-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
      {newOrders?.length > 0 ? <OrderDetailContainer page="home" /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});
