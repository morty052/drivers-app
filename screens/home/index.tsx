import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import { DriverBottomSheet } from "../../components/driver-bottomsheet";
import { SEMI_BOLD } from "../../constants/fontNames";
import MapViewDirections from "react-native-maps-directions";
import { getItem } from "../../utils/storage";
import { MapStyle } from "../../constants/mapStyle";
import { useSocketContext } from "../../contexts/SocketContext";
import { Sidebar } from "../../components/sidebar";
import { StatusBar } from "expo-status-bar";

type Props = {};

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

export const Home = (props: Props) => {
  const [online, setOnline] = React.useState(false);

  const { socket } = useSocketContext();

  React.useEffect(() => {
    socket?.on("lol", (users: string[]) => {
      console.info("driver connected message received");
    });
  }, [socket]);

  const latitude = getItem("latitude");
  const longitude = getItem("longitude");

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
          style={[styles.map, { height: !online ? "85%" : "70%" }]}
        >
          <Marker coordinate={{ latitude: 43.9395387, longitude: -78.71435 }} />
          <Marker coordinate={destination} />
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_DIRECTIONS_APIKEY}
            strokeWidth={8}
            strokeColor={Colors.primary}
          />
        </MapView>
        {!online && <GoOnlineButton handleOnline={handleOnline} />}
        <DriverBottomSheet setOnline={setOnline} online={online} />
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
