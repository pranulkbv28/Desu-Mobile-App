import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      {/* <StatusBar
        barStyle="dark-content" // or "light-content" depending on your needs
        translucent={false}
        backgroundColor="white"
      /> */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </>
  );
}
