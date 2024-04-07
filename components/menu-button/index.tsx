import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

type Props = {};

export const MenuButton = (props: Props) => {
  const navigation = useNavigation();

  function handleOpenSidebar() {
    // @ts-ignore
    navigation.openDrawer();
  }

  return (
    <Pressable
      onPress={handleOpenSidebar}
      style={{
        backgroundColor: "white",
        height: 40,
        width: 40,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        marginTop: 10,
      }}
    >
      <Ionicons name="menu" size={25} />
    </Pressable>
  );
};

const styles = StyleSheet.create({});
