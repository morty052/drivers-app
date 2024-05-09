import { Pressable, StyleSheet, Text, View, Image } from "react-native";
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
import { StatusBar } from "expo-status-bar";
import { baseUrl } from "../../constants/baseUrl";
import { getItem, setItem } from "../../utils/storage";
import usePlaySound from "../../hooks/useSound";
import { useDriverLocation } from "../../hooks/useDriverLocation";
import { useDriverStore } from "../../models/driverStore";
import HomeLoadingScreen from "./components/HomeLoadingScreen";
import { EarningsIndicator } from "../../components/earnings-indicator";
import { MenuButton } from "../../components/menu-button";
import driver_marker from "../../assets/location_marker.png";
import store_marker from "../../assets/store_marker.png";
import InteractionButtons from "./components/InteractionButtons";
import DriverMarker from "../../components/map/markers/DriverMarker";
import StoreMarker from "../../components/map/markers/StoreMarker";

type Props = {};

const GOOGLE_MAPS_DIRECTIONS_APIKEY = "AIzaSyDK51O-aWGsxDgTkr2B9qRBwUzMPjyeuZs";
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
    user: {
      firstname: string;
    };
  };
  vendor_location: {
    lat: number;
    lng: number;
  };
};

const NewDeliveryPopup = ({
  newDelivery,
  acceptOrder,
  rejectOrder,
}: {
  newDelivery: NewdeliveryProps | null;
  acceptOrder: () => void;
  rejectOrder: () => void;
}) => {
  const { total, vendor } = newDelivery ?? {};
  const address = React.useMemo(() => {
    return `${vendor?.address.street}, ${vendor?.address.city}, ${vendor?.address.province}, ${vendor?.address.postal_code}`;
  }, [newDelivery]);

  if (!newDelivery) {
    return null;
  }

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
          onPress={rejectOrder}
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
      {/* DIRECTIONS */}
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
              width: 1,
              height: "30%",
              backgroundColor: "white",
              marginLeft: 10,
              // transform: [{ rotate: "90deg" }],
            }}
          ></View>
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

async function fetchNearbyOrders() {
  try {
    const latitude = getItem("latitude");
    const longitude = getItem("longitude");
    const res = await fetch(
      `${baseUrl}/drivers/nearby-orders?lat=${latitude}&lng=${longitude}`
    );
    const data = await res.json();
    const { status, orders } = data;
    if (status.error) {
      throw "something went wrong";
    }
    return orders;
  } catch (error) {
    console.error(error);
  }
}

export const Home = ({ navigation }: any) => {
  // const [online, setOnline] = React.useState(false);
  const [goingOnline, setGoingOnline] = React.useState(true);
  const [delivering, setDelivering] = React.useState<null | NewdeliveryProps>(
    null
  );
  const [newDelivery, setnewDelivery] = React.useState<null | NewdeliveryProps>(
    null
  );
  const [newDeliveryLocation, setnewDeliveryLocation] = React.useState<
    undefined | MapViewDirectionsDestination
  >();
  const [orders, setOrders] = React.useState(null);

  const mapRef = React.useRef<MapView>(null);

  const playSound = usePlaySound();

  const { online, setOnline } = useDriverStore();

  const { location: origin, loadingLocation } = useDriverLocation();

  const animateToStore = () => {
    if (mapRef.current) {
      mapRef.current.fitToElements({
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  const focusDriver = () => {
    mapRef.current?.animateToRegion({
      ...(origin as LatLng),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  function acceptOrder() {
    setnewDelivery(null);
    setDelivering(newDelivery);
    navigation.navigate("OrderScreen", { order: newDelivery });
  }

  function rejectOrder() {
    console.info("rejected");
    setnewDelivery(null);
    setnewDeliveryLocation(undefined);
  }

  async function handleOnline() {
    try {
      const driver_id = getItem("_id");
      const lat = getItem("latitude");
      const lng = getItem("longitude");
      const res = await fetch(`${baseUrl}/drivers/go-online`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ driver_id, lat, lng }),
      });
      const data = await res.json();
      const orders = await fetchNearbyOrders();
      setOrders(orders);
      setOnline(true);
      console.log("orders", orders);
      setItem("ONLINE", "true");
    } catch (error) {
      console.error(error);
    }
  }

  const { socket } = useSocketContext();

  React.useEffect(() => {
    socket?.on("lol", () => {
      console.info("driver connected message received");
    });
    socket?.on("NEW_DELIVERY", async (data: { order: NewdeliveryProps[] }) => {
      setnewDelivery(data.order[0]);
      const vendor_location = data.order[0].vendor_location;
      setnewDeliveryLocation({
        latitude: Number(vendor_location.lat),
        longitude: Number(vendor_location.lng),
      });
      // animateToStore();
      await playSound();
    });
  }, [socket]);

  React.useLayoutEffect(() => {
    if (!origin) {
      return;
    }

    navigation.setOptions({
      drawerLabel: "Home",
      headerTitle: () => <EarningsIndicator />,
      headerTitleAlign: "center",
      headerLeft: () => <MenuButton />,
    });
  }, [origin]);

  if (loadingLocation || !origin) {
    return <HomeLoadingScreen />;
  }

  return (
    <>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          // customMapStyle={online ? MapStyle : undefined}
          showsCompass={false}
          region={{
            ...(origin as LatLng),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider={PROVIDER_GOOGLE}
          style={[
            styles.map,
            !newDelivery && { height: "90%" },
            newDelivery && { height: "100%" },
          ]}
        >
          <Marker coordinate={origin as LatLng}>
            {/* <View style={{ height: 50, width: 50 }}>
              <Image
                resizeMode="contain"
                style={{ height: 50, width: 50, alignSelf: "center" }}
                source={driver_marker}
              />
            </View> */}
            <DriverMarker />
          </Marker>
          {newDeliveryLocation && (
            <Marker
              pinColor="#474744"
              title={newDelivery?.vendor?.name}
              coordinate={newDeliveryLocation as LatLng}
            >
              <View style={{ height: 70, width: 70 }}>
                {/* <Image
                  resizeMode="contain"
                  style={{ height: 70, width: 70, alignSelf: "center" }}
                  source={store_marker}
                /> */}
                <StoreMarker />
              </View>
            </Marker>
          )}
          {newDeliveryLocation && (
            <MapViewDirections
              origin={origin as LatLng}
              destination={newDeliveryLocation}
              apikey={GOOGLE_MAPS_DIRECTIONS_APIKEY}
              strokeWidth={8}
              strokeColor={Colors.primary}
              onReady={() => animateToStore()}
            />
          )}
        </MapView>
        <InteractionButtons
          online={online}
          focusDriver={focusDriver}
          handleOnline={handleOnline}
        />
        <DriverBottomSheet
          delivering={delivering}
          newDelivery={newDelivery}
          orders={orders}
          online={online}
        />
        <NewDeliveryPopup
          acceptOrder={acceptOrder}
          rejectOrder={rejectOrder}
          newDelivery={newDelivery}
        />
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
  mapMarkerImage: {
    height: 35,
    width: 35,
  },
  bottomContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: Colors.darkGrey,
    flex: 1,
    position: "relative",
    height: "10%",
  },
  ordersText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
});
