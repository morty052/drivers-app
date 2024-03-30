import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../constants/colors";
import { SEMI_BOLD } from "../../constants/fontNames";

type Props = {};

export const EarningsIndicator = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.Currencytext}>$</Text>
      <Text style={styles.amount}>180.00</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkGrey,
    height: 40,
    width: 140,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 2,
    marginTop: 10,
  },
  amount: {
    color: "white",
    fontSize: 20,
    fontFamily: SEMI_BOLD,
  },
  Currencytext: {
    color: Colors.primary,
    fontSize: 20,
    fontFamily: SEMI_BOLD,
  },
});
