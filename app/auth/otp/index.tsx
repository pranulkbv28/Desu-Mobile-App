import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState, useRef } from "react";
import { Colors } from "@/constants/Colors";
import AuthNavbar from "@/components/AuthNavbar";
import OTPInput from "@/components/OTPInput";
import { useRouter } from "expo-router";

const OTPVerification = () => {
  const router = useRouter();

  // State for OTP inputs
  const [otp, setOTP] = useState(["", "", "", ""]);

  // Refs for input focus management with proper typing
  const inputRefs = useRef<(TextInput | null)[]>([null, null, null, null]);

  // Handle OTP input change
  const handleOTPChange = (text: string, index: number) => {
    const newOTP = [...otp];
    newOTP[index] = text;
    setOTP(newOTP);

    // Auto focus to next input
    if (text.length === 1 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace to move to previous input
  const handleBackspace = (index: number, text: string) => {
    if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Verify OTP
  const verifyOTP = () => {
    const otpCode = otp.join("");
    console.log("Verifying OTP:", otpCode);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>
            <AuthNavbar />
            <View style={styles.body}>
              <View style={styles.otpContainer}>
                <Text style={styles.titleText}>Verify OTP</Text>
                <Text style={styles.subtitleText}>
                  Enter the 4-digit code sent to your email
                </Text>

                <View style={styles.otpInputContainer}>
                  {otp.map((digit, index) => (
                    <OTPInput
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      value={digit}
                      onChangeText={(text) => handleOTPChange(text, index)}
                      onKeyPress={({ nativeEvent }) => {
                        if (nativeEvent.key === "Backspace") {
                          handleBackspace(index, digit);
                        }
                      }}
                      maxLength={1}
                      index={index}
                    />
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.verifyButton}
                  onPress={verifyOTP}
                >
                  <Text style={styles.verifyButtonText}>Verify</Text>
                </TouchableOpacity>

                <View style={styles.resendContainer}>
                  <Text style={styles.resendText}>
                    Didn't receive the code?{" "}
                  </Text>
                  <Pressable
                    onPress={() => {
                      /* Resend OTP logic */
                    }}
                  >
                    <Text style={styles.resendLinkText}>Resend</Text>
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

export default OTPVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0cc0df",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  scrollContainer: {
    // flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  otpContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white.background,
    marginBottom: 10,
  },
  subtitleText: {
    color: Colors.white.background,
    marginBottom: 30,
    textAlign: "center",
  },
  otpInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 30,
  },
  verifyButton: {
    backgroundColor: Colors.white.background,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 20,
  },
  verifyButtonText: {
    color: "#0cc0df",
    fontWeight: "bold",
    textAlign: "center",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  resendText: {
    color: Colors.white.background,
  },
  resendLinkText: {
    color: Colors.white.background,
    fontWeight: "bold",
  },
});
