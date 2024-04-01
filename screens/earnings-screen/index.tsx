import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/colors";
// import { CartesianChart, Bar } from "victory-native";
import { Button, Text } from "../../components/ui";
import { MEDIUM, SEMI_BOLD } from "../../constants/fontNames";

type Props = {};

const DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  highTmp: 40 + 30 * Math.random(),
}));

export const EarningsScreen = (props: Props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.darkGrey }}>
      <View style={styles.container}>
        <View>
          <Text fontFamily={SEMI_BOLD} style={styles.headerText}>
            Earnings
          </Text>
          <Text fontFamily={MEDIUM} style={styles.dateText}>
            1 Apr - 7 Apr
          </Text>
        </View>
        <View style={styles.listItemsContainer}>
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>Online</Text>
            <Text style={styles.listItemText}>16 mins</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>Trips</Text>
            <Text style={styles.listItemText}>16 </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>Points</Text>
            <Text style={styles.listItemText}>160 </Text>
          </View>
        </View>

        <Button variant="primary" title="View Details" />
        <View style={styles.hr}></View>
        <View>
          <Text fontFamily={MEDIUM} style={styles.balanceText}>
            Balance: $ 100
          </Text>
          <Text style={styles.paymentScheduleText}>
            Payment scheduled for apr 7
          </Text>
        </View>

        <Pressable style={styles.cashoutButton}>
          <Text fontFamily={MEDIUM} style={styles.cashoutButtonText}>
            Cash Out
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    paddingHorizontal: 10,
    gap: 30,
  },
  headerText: {
    fontSize: 30,
    color: Colors.light,
  },
  dateText: {
    fontSize: 16,
    color: Colors.light,
  },
  listItemsContainer: {
    gap: 30,
    paddingTop: 20,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemText: {
    fontSize: 16,
    color: Colors.light,
  },
  hr: {
    height: 2,
    backgroundColor: Colors.gray,
  },
  balanceText: {
    fontSize: 18,
    color: Colors.light,
  },
  paymentScheduleText: {
    fontSize: 14,
    color: Colors.light,
  },
  cashoutButton: {
    backgroundColor: Colors.light,
    width: 120,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  cashoutButtonText: {
    fontSize: 16,
  },
});
