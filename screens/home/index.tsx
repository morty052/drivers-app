import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import { DriverBottomSheet } from "../../components/driver-bottomsheet";
import { MEDIUM, SEMI_BOLD } from "../../constants/fontNames";
import MapViewDirections from "react-native-maps-directions";
import { getItem } from "../../utils/storage";
import { MapStyle } from "../../constants/mapStyle";
import { useSocketContext } from "../../contexts/SocketContext";
import { Sidebar } from "../../components/sidebar";
import { StatusBar } from "expo-status-bar";
import { VerificationPendingScreen } from "../verification-pending-screen";

type Props = {};

type NewdeliveryProps = {
  price: number;
};

const GoOnlineButton = ({ handleOnline }: { handleOnline: () => void }) => {
  return (
    <View
      style={{
        position: "absolute",
        // backgroundColor: "red",
        left: 0,
        right: 0,
        bottom: "16%",
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Pressable
        onPress={() => handleOnline()}
        style={{
          height: 80,
          width: 80,
          borderRadius: 50,
          backgroundColor: Colors.primary,
          alignItems: "center",
          justifyContent: "center",
          elevation: 10,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            color: "white",
            fontFamily: SEMI_BOLD,
          }}
        >
          Go
        </Text>
      </Pressable>
    </View>
  );
};

const NewDeliveryPopup = ({
  newDelivery,
}: {
  newDelivery: NewdeliveryProps | null;
}) => {
  return (
    <View
      style={{
        height: 380,
        width: "90%",
        backgroundColor: Colors.darkGrey,
        zIndex: 1,
        position: "absolute",
        bottom: "5%",
        alignSelf: "center",
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          alignSelf: "center",
          width: 150,
          backgroundColor: Colors.primary,
          borderRadius: 20,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Ionicons color={"white"} name="fast-food-outline" size={25} />
          <Text style={{ color: "white", fontFamily: MEDIUM }}>Delivery</Text>
        </View>
      </View>
      {/* AMOUNT */}
      <Text
        style={{
          textAlign: "center",
          color: "white",
          fontSize: 35,
          fontFamily: SEMI_BOLD,
          marginTop: 10,
        }}
      >
        ${newDelivery?.price}
      </Text>
      <View style={{ marginTop: 10, gap: 20, flex: 1 }}>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Ionicons name="time-outline" size={25} color="white" />
          <Text style={{ color: "white", fontFamily: MEDIUM }}>
            16 min (1.9 mi) total
          </Text>
        </View>

        <View style={{ justifyContent: "space-between", flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              paddingRight: 30,
            }}
          >
            <Ionicons name="location-outline" size={25} color="white" />
            <Text style={{ color: "white", fontFamily: MEDIUM }}>
              Nottingham - Cross Street Retail Park , ON, mn
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              paddingRight: 30,
            }}
          >
            <Ionicons name="person-outline" size={25} color="white" />
            <Text style={{ color: "white", fontFamily: MEDIUM }}>
              1020 Mulkrane - Cross Street Retail Park , ON, mn
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export const Home = (props: Props) => {
  const [online, setOnline] = React.useState(false);
  const [newDelivery, setnewDelivery] = React.useState<null | NewdeliveryProps>(
    null
  );

  const { socket } = useSocketContext();

  const verified = getItem("VERIFIED");

  React.useEffect(() => {
    if (!verified) {
      return;
    }
    socket?.on("lol", () => {
      console.info("driver connected message received");
    });
    socket?.on("NEW_DELIVERY", (data) => {
      console.info("New Order Received");
      setnewDelivery(data);
    });
  }, [socket]);

  const origin = { latitude: 43.9395387, longitude: -78.71435 };
  const destination = { latitude: 43.9395387, longitude: -78.81455 };
  const GOOGLE_MAPS_DIRECTIONS_APIKEY =
    "AIzaSyDK51O-aWGsxDgTkr2B9qRBwUzMPjyeuZs";

  async function handleOnline() {
    const res = await fetch("https://088a-102-216-10-2.ngrok-free.app");
    const data = await res.json();
    console.log(data);
    setOnline(true);
  }

  if (!verified) {
    return <VerificationPendingScreen />;
  }

  return (
    <>
      <Sidebar />
      <View style={styles.container}>
        <MapView
          showsBuildings
          // customMapStyle={online ? MapStyle : undefined}
          showsCompass={false}
          initialRegion={{
            latitude: 43.9395387,
            longitude: -78.71435,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider={PROVIDER_GOOGLE}
          style={[
            styles.map,
            !newDelivery && { height: !online ? "85%" : "70%" },
            newDelivery && { height: "100%" },
          ]}
        >
          <Marker coordinate={{ latitude: 43.9395387, longitude: -78.71435 }} />
          <Marker coordinate={destination} />
          {newDelivery && (
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_DIRECTIONS_APIKEY}
              strokeWidth={8}
              strokeColor={Colors.primary}
            />
          )}
        </MapView>
        {!online && !newDelivery && (
          <GoOnlineButton handleOnline={handleOnline} />
        )}
        {!newDelivery && (
          <DriverBottomSheet setOnline={setOnline} online={online} />
        )}
        {newDelivery && <NewDeliveryPopup newDelivery={newDelivery} />}
      </View>
      <StatusBar style="dark" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    // paddingHorizontal: 10,
    // paddingTop: 10,
  },
  map: {
    width: "100%",
  },
  bottomContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: Colors.darkGrey,
    flex: 1,
    position: "relative",
    height: "15%",
  },
  ordersText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
});
