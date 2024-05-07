import { getItem, setItem } from "../utils/storage";
import { LocationObject } from "expo-location";
import * as Location from "expo-location";
import React from "react";
import * as TaskManager from "expo-task-manager";

export const useDriverLocation = () => {
  const [location, setLocation] = React.useState<{
    longitude: number;
    latitude: number;
  } | null>(null);
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
    const { coords } = location ?? {};
    const { longitude, latitude } = coords;

    setLocation({ longitude, latitude });

    // * SAVE LATITUDE AND LONGITUDE TO SECURE STORE
    setItem("latitude", `${latitude}`), setItem("longitude", `${longitude}`);
    setLoading(false);
  }

  React.useEffect(() => {
    // TODO REMOVE THIS CODE
    const token = getItem("expo_push_token");
    if (token == "ExponentPushToken[jr5IjoIZ7abdkJDLnFUtrY]") {
      setLocation({ longitude: -78.7109587, latitude: 43.9522573 });

      // * SAVE LATITUDE AND LONGITUDE TO SECURE STORE
      setItem("latitude", `${43.9522573}`),
        setItem("longitude", `${-78.7109587}`);
      setLoading(false);
      return;
    }
    setCurrentLocation();
  }, []);

  return { location, errorMsg, loadingLocation: loading };
};
