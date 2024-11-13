import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import store from "@/store/store";

export default function RootLayout() {
  return (
    <>
      {/* <StatusBar
        barStyle="dark-content" // or "light-content" depending on your needs
        translucent={false}
        backgroundColor="white"
      /> */}
      <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      </Provider>
    </>
  );
}
