/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const primaryColorLight = "#0A7EA4";
const primaryColorDark = "#FFFFFF";
const secondaryColorLight = "#00A9F4";
const secondaryColorDark = "#E0E0E0";
const accentColor = "#F4B400";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#FFFFFF",
    primary: primaryColorLight,
    secondary: secondaryColorLight,
    accent: accentColor,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: primaryColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    primary: primaryColorDark,
    secondary: secondaryColorDark,
    accent: accentColor,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: primaryColorDark,
  },
  white: {
    text: "#000000",
    background: "#FFFFFF",
    primary: primaryColorDark,
    secondary: secondaryColorDark,
    accent: accentColor,
  },
  gray: "#7d7d7d",
  appGreen: "#37673a",
};
