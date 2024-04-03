import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/colors";
// import { CartesianChart, Bar } from "victory-native";
import { Button, Text } from "../../components/ui";
import { MEDIUM, SEMI_BOLD } from "../../constants/fontNames";
import { Bar, CartesianChart } from "victory-native";
import { useFont } from "@shopify/react-native-skia";
import { Inter_400Regular } from "@expo-google-fonts/inter";

type Props = {};

const data = Array.from({ length: 7 }, (_, index) => ({
  // Starting at sunday
  day: index + 1,
  // Randomizing the listen count between 100 and 50
  listenCount: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
}));

export const EarningsScreen = (props: Props) => {
  const font = useFont(Inter_400Regular, 12);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.darkGrey }}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={{ paddingHorizontal: 10 }}>
          <Text fontFamily={SEMI_BOLD} style={styles.headerText}>
            Earnings
          </Text>
          <Text fontFamily={MEDIUM} style={styles.dateText}>
            1 Apr - 7 Apr
          </Text>
        </View>

        <ScrollView>
          {/* CHART */}
          <View
            style={{
              height: 400,
              // backgroundColor: "white",
            }}
          >
            <CartesianChart
              padding={{ left: 10, right: 10, top: 0, bottom: 0 }}
              domainPadding={{ left: 30, right: 30 }}
              data={data}
              /**
               * 👇 the xKey should map to the property on data of you want on the x-axis
               */
              xKey="day"
              /**
               * 👇 the yKey is an array of strings that map to the data you want
               * on the y-axis. In this case we only want the listenCount, but you could
               * add additional if you wanted to show multiple song listen counts.
               */
              yKeys={["listenCount"]}
              axisOptions={{
                font,
                labelColor: "white",
                formatXLabel: (value) => {
                  const date = new Date(2024, 3, value - 1);
                  return date.toLocaleDateString("en", { day: "2-digit" });
                },
                formatYLabel: (value) => `${value}k`,
              }}
            >
              {({ points, chartBounds }) => (
                <Bar
                  chartBounds={chartBounds} // 👈 chartBounds is needed to know how to draw the bars
                  points={points.listenCount} // 👈 points is an object with a property for each yKey
                  roundedCorners={{
                    topLeft: 5,
                    topRight: 5,
                  }}
                  color={"white"}
                />
              )}
            </CartesianChart>
          </View>
          <View style={styles.innerContainer}>
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    // paddingHorizontal: 10,
    flex: 1,
    gap: 30,
    paddingBottom: 30,
  },
  innerContainer: {
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
