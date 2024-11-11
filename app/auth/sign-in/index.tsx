import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import AuthNavbar from "@/components/AuthNavbar";
import AuthBody from "@/components/AuthBody";
import AuthInput from "@/components/AuthInput";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();

  // State for form inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>
            <AuthNavbar />
            <View style={styles.body}>
              <AuthBody>
                <AuthInput
                  label="Email"
                  placeHolder="Enter your Email"
                  labelStyles={styles.labelStyles}
                  textInputStyles={styles.textInputStyles}
                  secureTextEntry={false}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
                <AuthInput
                  label="Password"
                  placeHolder="Enter your Password"
                  labelStyles={styles.labelStyles}
                  textInputStyles={styles.textInputStyles}
                  secureTextEntry={true}
                  keyboardType="default"
                  value={password}
                  onChangeText={setPassword}
                />
              </AuthBody>
              <View style={styles.footer}>
                <TouchableOpacity
                  onPress={() => router.push("/auth/otp")}
                  style={styles.btn}
                >
                  <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.signInContainer}>
                  <Pressable>
                    <Text style={styles.signInLinkText}>Forgot Password</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
  },
  body: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#0cc0df",
    marginTop: -30,
    flex: 1,
  },
  labelStyles: {
    color: Colors.white.background,
    fontSize: 20,
    fontWeight: "400",
  },
  textInputStyles: {
    color: "#bf592b",
    backgroundColor: "#55dcf3",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 99,
    marginTop: 10,
  },
  btn: {
    borderWidth: 2,
    borderColor: Colors.white.background,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 99,
    alignItems: "center",
  },
  btnText: {
    color: Colors.white.background,
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 20,
  },
  signInContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  signInText: {
    color: Colors.white.background,
  },
  signInLinkText: {
    color: Colors.white.background,
    fontWeight: "bold",
  },
});
