import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { removeItem } from "../../utils/storage";
import usePlaySound from "../../hooks/useSound";
import { useDriverStore } from "../../models/driverStore";
import { orderProps } from "../../types/order";
import { Button } from "../ui";
import { SEMI_BOLD } from "../../constants/fontNames";

type Props = {
  order: orderProps;
  accepted: boolean;
  handleAccept: () => void;
};

function InactiveSheetView({
  order,
  handleAccept,
}: {
  order: orderProps;
  handleAccept?: () => void;
}) {
  const { vendor } = order;
  return (
    <View style={styles.offlineContainer}>
      <View style={{ gap: 10 }}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 30, fontFamily: SEMI_BOLD }}>
            {vendor.name}
          </Text>
          <View style={styles.callIconContainer}>
            <Ionicons name="call" size={30} color={Colors.darkGrey} />
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Ionicons name="location-outline" size={30} color={Colors.light} />
          <Text style={{ color: "white", fontSize: 18 }}>
            {order?.vendor?.address?.street}
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Ionicons name="fast-food-outline" size={30} color={Colors.light} />
          <Text style={{ color: "white", fontSize: 18 }}>
            1 order for pickup
          </Text>
        </View>
      </View>
      <View style={{}}>
        <Button
          onPress={handleAccept}
          variant="primary"
          title="Accept Delivery"
        />
      </View>
    </View>
  );
}

function OnlineView({ orders }: { orders: any }) {
  const { setOnline } = useDriverStore();
  const navigation = useNavigation();

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Text onPress={() => setOnline(false)} style={styles.onlineText}>
        You're Online
      </Text>
      <Text style={{ color: "white", textAlign: "center" }}>
        Available orders nearby: {orders?.length}
      </Text>
      {/* <View style={{ marginTop: 10 }}>
        {orders?.map((order: orderProps, index: number) => {
          const { vendor_address } = order;
          const { city, province, street, postal_code } = vendor_address;
          const address = `${street} `;
          return (
            <Pressable
              onPress={() => {
                // @ts-ignore
                navigation.navigate("OrderScreen", { order });
              }}
              style={{
                backgroundColor: "white",
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 10,
                paddingHorizontal: 10,
                gap: 10,
                borderRadius: 10,
                marginBottom: 10,
              }}
              key={index}
            >
              <Image
                style={{ height: 70, width: 70, borderRadius: 10 }}
                source={{ uri: order?.vendor_logo }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ color: "black" }}>{order?.vendor}</Text>
                <Text style={{ color: "black" }}>{address}</Text>
                <Text style={{ color: "black" }}>${order?.total}</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="black"
              />
            </Pressable>
          );
        })}
      </View> */}
    </View>
  );
}

function DeliveryView() {
  return (
    <View>
      <Text style={styles.onlineText}>You're Online</Text>
      <Text style={{ color: "white", textAlign: "center" }}>
        Available orders nearby: 3
      </Text>
    </View>
  );
}

export const OrderBottomSheet = ({ order, accepted, handleAccept }: Props) => {
  const snapPoints = React.useMemo(
    () => (accepted ? ["40%", "70%", "90%"] : ["40%"]),
    []
  );

  return (
    <BottomSheet
      style={{ borderRadius: 0, zIndex: 4 }}
      handleIndicatorStyle={{ backgroundColor: "white" }}
      backgroundStyle={{
        backgroundColor: Colors.darkGrey,
        borderRadius: 0,
      }}
      index={0}
      snapPoints={snapPoints}
    >
      {!accepted && (
        <InactiveSheetView handleAccept={handleAccept} order={order} />
      )}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingBottom: Platform.select({ ios: 30, android: 0 }),
    // backgroundColor: Colors.darkGrey,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // height: "15%",
  },
  offlineContainer: {
    paddingHorizontal: 20,
    paddingBottom: Platform.select({ ios: 30, android: 30 }),
    justifyContent: "space-between",
    flex: 1,
  },
  onlineText: {
    fontSize: 20,
    textAlign: "center",
    color: Colors.primary,
  },
  callIconContainer: {
    backgroundColor: Colors.light,
    height: 50,
    width: 50,
    marginTop: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
