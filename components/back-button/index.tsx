import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

type Props = {};

export const BackButton = (props: Props) => {
  const navigation = useNavigation();

  function handleOpenSidebar() {
    // @ts-ignore
    navigation.openDrawer();
  }

  return (
    <Pressable
      onPress={() => navigation.goBack()}
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
      <Ionicons name="arrow-back" size={30} />
    </Pressable>
  );
};

const styles = StyleSheet.create({});
