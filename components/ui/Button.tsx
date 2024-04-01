import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useMemo } from "react";
import Colors from "../../constants/colors";
import { SEMI_BOLD } from "../../constants/fontNames";

type Props = {
  loading?: boolean;
  onPress?: () => void;
  variant: "primary" | "dark" | "disabled" | "link" | "light";
  title: string;
};

export const Button = ({ loading, variant, title, onPress }: Props) => {
  return (
    <Pressable onPress={onPress} style={styles[variant as keyof typeof styles]}>
      {!loading && (
        <Text style={textStyles[variant as keyof typeof styles]}>{title}</Text>
      )}
      {loading && <ActivityIndicator size={40} color={"white"} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  primary: {
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
  },
  dark: {
    backgroundColor: Colors.darkGrey,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
  },
});

const textStyles = StyleSheet.create({
  primary: {
    color: "white",
    fontSize: 20,
    fontFamily: SEMI_BOLD,
  },
  dark: {
    color: "white",
    fontSize: 20,
    fontFamily: SEMI_BOLD,
  },
});
