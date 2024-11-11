import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";

const AuthInput = ({
  label,
  labelStyles,
  textInputStyles,
  placeHolder,
  secureTextEntry,
  keyboardType,
  value,
  onChangeText,
}: {
  label?: string;
  labelStyles?: any;
  textInputStyles: any;
  placeHolder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  value: string;
  onChangeText: (text: string) => void;
}) => {
  return (
    <View style={styles.container}>
      <Text style={labelStyles}>{label}</Text>
      <TextInput
        style={textInputStyles}
        placeholder={placeHolder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="next"
        blurOnSubmit={false}
      />
    </View>
  );
};

export default AuthInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
