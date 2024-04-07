import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInLeft } from "react-native-reanimated";

type Props = {};

const HomeLoadingScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInLeft} style={styles.iconContainer}>
        <Ionicons name="location" size={200} color={Colors.light} />
      </Animated.View>
    </View>
  );
};

export default HomeLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    borderRadius: 150,
    borderColor: Colors.light,
  },
});
