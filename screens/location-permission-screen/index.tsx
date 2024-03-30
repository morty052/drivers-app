import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import { Button } from "../../components/ui";
import { LocationObject } from "expo-location";
import * as Location from "expo-location";
import { reverseGeocodeAddress } from "../../utils/reverseGeocodeAddress";
import { setItem } from "../../utils/storage";
import { MEDIUM, REGULAR, SEMI_BOLD } from "../../constants/fontNames";
import { Text } from "../../components/ui";

export const LocationPermissionScreen = ({ navigation }: any) => {
  const [location, setLocation] = React.useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function setCurrentLocation() {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    const { coords } = location ?? {};
    const { longitude, latitude } = coords;

    // * SAVE LATITUDE AND LONGITUDE TO SECURE STORE
    setItem("latitude", `${latitude}`), setItem("longitude", `${longitude}`);

    // * GET USER ADDRESS USING LATITUDE AND LONGITUDE
    // const delivery_address = await reverseGeocodeAddress({
    //   latitude: `${location?.coords.latitude}`,
    //   longitude: `${location?.coords.longitude}`,
    // });

    //  * SAVE USER ONBOARDING
    setItem("ONBOARDED", "TRUE");

    setLoading(false);

    // * PASS LATITUDE AND LONGITUDE TO LOCATION CONFIRMATION SCREEN
    // navigation.navigate("LocationConfirmation", {
    //   latitude: location?.coords.latitude,
    //   longitude: location?.coords.longitude,
    //   delivery_address,
    // });
    navigation.navigate("HomeStack");
  }

  const handleSkip = async () => {
    //  * SAVE USER ONBOARDING
    setItem("ONBOARDED", "TRUE");
    navigation.navigate("HomeStack", {
      latitude: location?.coords.latitude,
      longitude: location?.coords.longitude,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Ionicons size={200} name="location" color={Colors.primary} />
      </View>
      <View style={{ rowGap: 5, paddingBottom: 40 }}>
        <Text fontFamily={SEMI_BOLD} style={styles.accessText}>
          Allow location access
        </Text>
        <Text style={styles.subtitle}>
          This lets us show you relevant delivery requests
        </Text>
      </View>
      <View style={{ rowGap: 20, paddingBottom: 50 }}>
        <Button
          loading={loading}
          onPress={setCurrentLocation}
          variant="primary"
          title="Allow"
        />
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => handleSkip()}
        >
          <Text fontFamily={MEDIUM} style={styles.skipButtonText}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  accessText: {
    fontSize: 30,
    color: Colors.dark,
  },
  subtitle: {
    fontSize: 20,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  skipButton: {
    backgroundColor: "white",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  skipButtonText: {
    color: Colors.dark,
    fontSize: 20,
    textAlign: "center",
  },
});
