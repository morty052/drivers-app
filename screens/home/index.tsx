import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import { DriverBottomSheet } from "../../components/driver-bottomsheet";
import { MEDIUM, SEMI_BOLD } from "../../constants/fontNames";
import MapViewDirections, {
  MapViewDirectionsDestination,
} from "react-native-maps-directions";
import { useSocketContext } from "../../contexts/SocketContext";
import { Sidebar } from "../../components/sidebar";
import { StatusBar } from "expo-status-bar";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { baseUrl } from "../../constants/baseUrl";
import { getItem } from "../../utils/storage";

const BACKGROUND_FETCH_TASK = "background-fetch";

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();

  console.log(
    `Got background fetch call at date: ${new Date(now).toISOString()}`
  );

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 2, // 2 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

type Props = {};

type NewdeliveryProps = {
  total: number;
  vendor: {
    name: string;
    image: string;
    address: {
      street: string;
      city: string;
      province: string;
      postal_code: string;
    };
    location: {
      lat: number;
      lng: number;
    };
    user: {
      firstname: string;
    };
  };
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
  setNewDelivery,
  acceptOrder,
}: {
  newDelivery: NewdeliveryProps | null;
  setNewDelivery: React.Dispatch<React.SetStateAction<NewdeliveryProps | null>>;
  acceptOrder: () => void;
}) => {
  const { total, vendor } = newDelivery ?? {};
  const address = `${vendor?.address.street}, ${vendor?.address.city}, ${vendor?.address.province} ${vendor?.address.postal_code}`;
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
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Ionicons
          onPress={() => setNewDelivery(null)}
          color={Colors.danger}
          name="close-circle-outline"
          size={30}
        />
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
        <Ionicons
          onPress={() => acceptOrder()}
          color={Colors.primary}
          name="checkmark-circle-outline"
          size={30}
        />
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
        ${total}
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
            <Ionicons name="storefront-outline" size={25} color="white" />
            <Text style={{ color: "white", fontFamily: MEDIUM }}>
              {address}
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
  const [newDeliveryLocation, setnewDeliveryLocation] = React.useState<
    undefined | MapViewDirectionsDestination
  >();
  const [orders, setOrders] = React.useState(null);

  const origin = { latitude: 43.9395387, longitude: -78.71435 };
  const GOOGLE_MAPS_DIRECTIONS_APIKEY =
    "AIzaSyDK51O-aWGsxDgTkr2B9qRBwUzMPjyeuZs";

  const mapRef = React.useRef<MapView>(null);

  const animateToStore = ({ lat, lng }: { lat: number; lng: number }) => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(
        [{ latitude: lat, longitude: lng }, origin],
        {
          animated: true,
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        }
      );
    }
  };

  function acceptOrder() {
    console.info(newDeliveryLocation);
  }

  function rejectOrder() {
    console.info("accepted");
  }

  async function handleOnline() {
    const _id = getItem("_id");
    const res = await fetch(`${baseUrl}/drivers/go-online?_id=${_id}`);
    const data = await res.json();
    console.log(data);
    setOnline(true);
  }

  const { socket } = useSocketContext();

  React.useEffect(() => {
    socket?.on("lol", () => {
      console.info("driver connected message received");
    });
    socket?.on("NEW_DELIVERY", (data: { order: NewdeliveryProps[] }) => {
      setnewDelivery(data.order[0]);
      const vendor = data.order[0].vendor;
      setnewDeliveryLocation({
        latitude: Number(vendor.location.lat),
        longitude: Number(vendor.location.lng),
      });
      animateToStore({
        lat: Number(vendor.location.lat),
        lng: Number(vendor.location.lng),
      });
    });
  }, [socket]);

  React.useEffect(() => {
    // const f = async () => {
    //   let { status } = await Location.requestForegroundPermissionsAsync();
    //   if (status !== "granted") {
    //     console.log("Permission to access location was denied");
    //     return;
    //   }

    //   await Location.startLocationUpdatesAsync("backgroundTask", {
    //     accuracy: Location.Accuracy.BestForNavigation,
    //     timeInterval: 300000,
    //     showsBackgroundLocationIndicator: true,
    //   });

    //   BackgroundFetch.registerTaskAsync("backgroundTask", {
    //     minimumInterval: 300,
    //     stopOnTerminate: false,
    //   });

    //   BackgroundFetch.setMinimumIntervalAsync(300);
    // };
    // f();
    registerBackgroundFetchAsync();
  }, []);

  return (
    <>
      <Sidebar />
      <View style={styles.container}>
        <MapView
          ref={mapRef}
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
          <Marker
            image={require("../../assets/location_marker.png")}
            coordinate={{ latitude: 43.9395387, longitude: -78.71435 }}
          />
          {newDeliveryLocation && (
            <Marker
              image={require("../../assets/store_marker.png")}
              coordinate={newDeliveryLocation as LatLng}
            />
          )}
          {newDeliveryLocation && (
            <MapViewDirections
              origin={origin}
              destination={newDeliveryLocation}
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
          <DriverBottomSheet
            orders={orders}
            setOnline={setOnline}
            online={online}
          />
        )}
        {newDelivery && (
          <NewDeliveryPopup
            acceptOrder={acceptOrder}
            setNewDelivery={setnewDelivery}
            newDelivery={newDelivery}
          />
        )}
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
