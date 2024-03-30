import { StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "../ui";

type Props = {};

export const Header = (props: Props) => {
  return (
    <SafeAreaView
      edges={{
        top: "additive",
        bottom: "off",
      }}
      style={{ backgroundColor: "white" }}
    >
      <View style={styles.container}>
        <Ionicons name="person" size={25} color={"black"} />
        <View style={styles.statusContainer}>
          <Text>Available</Text>
          <Ionicons name="chevron-down-outline" size={20} color={"black"} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});
