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

type Props = {
  online: boolean;
  orders: any;
  newDelivery: any;
  delivering: any;
};

function OfflineSheetView() {
  const navigation = useNavigation();
  const playSound = usePlaySound();
  return (
    <View style={styles.offlineContainer}>
      {/* <Ionicons
        onPress={async () => {
          await playSound();
        }}
        name="options-outline"
        size={20}
        color={"white"}
      /> */}
      <Text style={styles.onlineText}>You're Offline</Text>
      {/* <Ionicons
        onPress={() => {
          removeItem("VERIFIED");
          removeItem("ONBOARDED");
        }}
        name="menu"
        size={20}
        color={"white"}
      /> */}
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
      <View style={{ marginTop: 10 }}>
        {orders?.map((order: orderProps, index: number) => {
          const { vendor } = order;
          const { city, province, street, postal_code } = vendor.address;
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
                source={{ uri: order?.vendor.image }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ color: "black" }}>{order?.vendor.name}</Text>
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
      </View>
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

export const DriverBottomSheet = ({
  online,
  orders,
  newDelivery,
  delivering,
}: Props) => {
  const snapPoints = React.useMemo(
    () => (online ? ["30%", "50%", "70%"] : ["10%"]),
    [online]
  );

  if (newDelivery) {
    return null;
  }

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
      {!online && <OfflineSheetView />}
      {online && <OnlineView orders={orders} />}
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
    paddingHorizontal: 25,
    paddingBottom: Platform.select({ ios: 30, android: 0 }),
    // backgroundColor: Colors.darkGrey,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // height: "15%",
  },
  onlineText: {
    fontSize: 20,
    textAlign: "center",
    color: Colors.primary,
  },
});
