import React, { forwardRef } from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { Colors } from "@/constants/Colors";

interface OTPInputProps extends TextInputProps {
  index: number;
}

const OTPInput = forwardRef<TextInput, OTPInputProps>(
  ({ value, onChangeText, onKeyPress, maxLength, index, ...rest }, ref) => {
    return (
      <TextInput
        ref={ref}
        style={styles.input}
        keyboardType="numeric"
        maxLength={maxLength}
        value={value}
        onChangeText={onChangeText}
        onKeyPress={onKeyPress}
        textAlign="center"
        {...rest}
      />
    );
  }
);

export default OTPInput;

const styles = StyleSheet.create({
  input: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: Colors.white.background,
    borderRadius: 10,
    fontSize: 24,
    color: Colors.white.background,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
});
