import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { orderProps } from "../../types/order";
import { OrderBottomSheet } from "../../components/order-bottomsheet";
import Map from "../../components/map";
import { useDriverLocation } from "../../hooks/useDriverLocation";
import MapView, { LatLng } from "react-native-maps";

type Props = {};

export const OrderScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [accepted, setAccepted] = React.useState(false);
  const [delivering, setDelivering] = React.useState(false);
  const mapRef = React.useRef<MapView>(null);
  const { order }: { order: orderProps } = route.params;
  const { vendor_location, user_location, vendor, delivery_address } = order;

  const { lat, lng } = vendor_location;
  const { name } = vendor;

  const pickupLocation = {
    coords: {
      latitude: Number(lat),
      longitude: Number(lng),
    },
    name,
  };

  const deliveryLocation = {
    coords: {
      latitude: Number(user_location.lat),
      longitude: Number(user_location.lng),
    },
    address: delivery_address,
  };

  const { location: origin, loadingLocation } = useDriverLocation();

  const handleAccept = () => {
    setDelivering(true);
  };

  if (loadingLocation || !origin) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Map
        delivering={delivering}
        delivery_location={deliveryLocation}
        height={!accepted ? "70%" : "60%"}
        mapRef={mapRef}
        pickupLocation={pickupLocation}
        origin={origin as LatLng}
      />
      <OrderBottomSheet
        handleAccept={handleAccept}
        accepted={accepted}
        order={order}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
