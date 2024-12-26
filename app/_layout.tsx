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
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen name="checkout/index" options={{ title: "Checkout" }} />
          <Stack.Screen name="auth/otp/index" options={{ title: "OTP" }} />
          <Stack.Screen
            name="auth/sign-in/index"
            options={{ title: "Sign In" }}
          />
          <Stack.Screen
            name="auth/sign-up/index"
            options={{ title: "Sign Up" }}
          />
          <Stack.Screen name="home/index" options={{ title: "Home" }} />
          <Stack.Screen
            name="home/tabs/inbox/index"
            options={{ title: "Inbox" }}
          />
          <Stack.Screen
            name="home/tabs/list/index"
            options={{ title: "List" }}
          />
          <Stack.Screen
            name="home/tabs/menu/index"
            options={{ title: "Menu" }}
          />
          <Stack.Screen
            name="restaurants/[id]/index"
            options={{ title: "Restaurant" }}
          />
        </Stack>
      </Provider>
    </>
  );
}
