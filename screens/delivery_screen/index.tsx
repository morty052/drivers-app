import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { orderProps } from "../../types/order";
import { OrderBottomSheet } from "../../components/order-bottomsheet";
import Map from "../../components/map";
import { useDriverLocation } from "../../hooks/useDriverLocation";
import MapView, { LatLng } from "react-native-maps";

type Props = {};

const animateToStore = ({
  lat,
  lng,
  mapRef,
  origin,
}: {
  lat: number;
  lng: number;
  mapRef: any;
  origin: LatLng;
}) => {
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

export const DeliveryScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [accepted, setAccepted] = React.useState(false);
  const mapRef = React.useRef<MapView>(null);
  const { order }: { order: orderProps } = route.params;
  const { vendor_location } = order;

  const { lat, lng } = vendor_location;

  const pickupLocation = {
    coords: {
      latitude: Number(lat),
      longitude: Number(lng),
    },
  };

  const { location: origin, loadingLocation } = useDriverLocation();

  console.info({ order, origin, pickupLocation });

  //   React.useLayoutEffect(() => {
  //     navigation.setOptions({
  //       headerTitle: order.vendor,
  //     });
  //   }, []);

  React.useEffect(() => {
    animateToStore({
      lat: Number(lat),
      lng: Number(lng),
      mapRef,
      origin: origin as LatLng,
    });
  }, []);

  if (loadingLocation || !origin) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Map
        height={!accepted ? "70%" : "60%"}
        mapRef={mapRef}
        pickupLocation={pickupLocation}
        origin={origin as LatLng}
      />
      <OrderBottomSheet accepted={accepted} order={order} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
