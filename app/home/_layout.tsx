import React from "react";
import { Colors } from "@/constants/Colors";
import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { StatusBar, StyleSheet } from "react-native";
import AppHeader from "@/components/AppHeader";
import { Provider } from "react-redux";
import store from "@/store/store";

export default () => {
  return (
    <>
      <Provider store={store}>
        <AppHeader />
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
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});
