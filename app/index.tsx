import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Text, View, Animated, StyleSheet } from "react-native";

export default function Index() {
  const fadeInD = useRef(new Animated.Value(0)).current;
  const fadeInE = useRef(new Animated.Value(0)).current;
  const fadeInS = useRef(new Animated.Value(0)).current;
  const fadeInU = useRef(new Animated.Value(0)).current;

  const router = useRouter();

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeInD, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeInE, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeInS, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeInU, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      router.replace("/home/(tabs)/list");
    }, 3000);
  }, [fadeInD, fadeInE, fadeInS, fadeInU]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Animated.Text style={[styles.text, { opacity: fadeInD }]}>
          D
        </Animated.Text>
        <Animated.Text style={[styles.text, { opacity: fadeInE }]}>
          E
        </Animated.Text>
      </View>
      <View style={styles.row}>
        <Animated.Text style={[styles.text, { opacity: fadeInS }]}>
          S
        </Animated.Text>
        <Animated.Text style={[styles.text, { opacity: fadeInU }]}>
          U
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0cc0df",
  },
  row: {
    flexDirection: "row",
  },
  text: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#ffd200",
    marginHorizontal: 5,
    textShadowColor: "#d269e6",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 2,
  },
});
