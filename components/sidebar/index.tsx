import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

type Props = {};

export const Sidebar = () => {
  const navigation = useNavigation();
  function handleCloseSidebar() {
    navigation.setOptions({
      headerShown: true,
    });
  }
  return (
    <>
      <View style={styles.container}>
        <Text onPress={handleCloseSidebar}>close</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: "65%",
    zIndex: 2000,
    elevation: 10,
  },
});
