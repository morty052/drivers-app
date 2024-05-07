import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Colors from "../../constants/colors";
import driver_marker from "../../assets/location_marker.png";
import store_marker from "../../assets/store_marker.png";
import user_marker from "../../assets/user_marker.png";

type Props = {
  mapRef: any;
  origin: LatLng;
  pickupLocation: any;
  height: any;
  delivery_location: any;
  delivering: boolean;
};

const GOOGLE_MAPS_DIRECTIONS_APIKEY = "AIzaSyDK51O-aWGsxDgTkr2B9qRBwUzMPjyeuZs";

const Map = ({
  mapRef,
  origin,
  pickupLocation,
  height,
  delivery_location,
  delivering,
}: Props) => {
  return (
    <MapView
      ref={mapRef}
      showsBuildings
      // customMapStyle={online ? MapStyle : undefined}
      showsCompass={false}
      region={{
        ...origin,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      provider={PROVIDER_GOOGLE}
      style={[styles.map, { height }]}
    >
      <Marker coordinate={origin as LatLng}>
        <View style={{ height: 50, width: 50 }}>
          <Image
            resizeMode="contain"
            style={{ height: 50, width: 50, alignSelf: "center" }}
            source={driver_marker}
          />
        </View>
      </Marker>

      {pickupLocation && (
        <Marker
          pinColor="#474744"
          title={pickupLocation?.name}
          coordinate={pickupLocation.coords as LatLng}
        >
          <View style={{ height: 70, width: 70 }}>
            <Image
              resizeMode="contain"
              style={{ height: 70, width: 70, alignSelf: "center" }}
              source={store_marker}
            />
          </View>
        </Marker>
      )}
      {delivering && (
        <Marker
          title={delivery_location.address}
          coordinate={delivery_location.coords as LatLng}
        >
          <View style={{ height: 70, width: 70 }}>
            <Image
              resizeMode="contain"
              style={{ height: 70, width: 70, alignSelf: "center" }}
              source={user_marker}
            />
          </View>
        </Marker>
      )}
      <MapViewDirections
        origin={origin}
        destination={
          !delivering ? pickupLocation.coords : delivery_location.coords
        }
        apikey={GOOGLE_MAPS_DIRECTIONS_APIKEY}
        strokeWidth={8}
        strokeColor={Colors.primary}
      />
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: "100%",
  },
});
