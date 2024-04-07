import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Colors from "../../constants/colors";

type Props = {
  mapRef: any;
  origin: LatLng;
  pickupLocation: any;
  height: any;
};

const GOOGLE_MAPS_DIRECTIONS_APIKEY = "AIzaSyDK51O-aWGsxDgTkr2B9qRBwUzMPjyeuZs";

const Map = ({ mapRef, origin, pickupLocation, height }: Props) => {
  const animateToStore = () => {
    mapRef.current.fitToCoordinates(
      [pickupLocation?.coords, origin as LatLng],
      {
        animated: true,
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      }
    );
  };

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
      <Marker coordinate={origin as LatLng} />

      {pickupLocation && (
        <Marker
          pinColor="#474744"
          title={pickupLocation?.vendor?.name}
          coordinate={pickupLocation.coords as LatLng}
        />
      )}
      <MapViewDirections
        onStart={() => animateToStore()}
        origin={origin}
        destination={pickupLocation.coords}
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
