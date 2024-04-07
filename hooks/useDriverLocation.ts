import { setItem } from "../utils/storage";
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
    // let subscription: any = null;

    // (async () => {
    //   setLoading(true);
    //   let { status } = await Location.requestForegroundPermissionsAsync();
    //   if (status !== "granted") {
    //     setErrorMsg("Permission to access location was denied");
    //     return;
    //   }

    //   let location = await Location.getCurrentPositionAsync({});
    //   const { coords } = location ?? {};
    //   const { longitude, latitude } = coords;

    //   setLocation({ longitude, latitude });

    //   // * SAVE LATITUDE AND LONGITUDE TO SECURE STORE
    //   setItem("latitude", `${latitude}`), setItem("longitude", `${longitude}`);
    //   setLoading(false);
    //   subscription = Location.watchPositionAsync(
    //     {
    //       accuracy: Location.Accuracy.BestForNavigation,
    //       timeInterval: 10000,
    //     },
    //     (location) => {
    //       const { coords } = location ?? {};
    //       const { longitude, latitude } = coords;
    //       console.log("Location Changed", { longitude, latitude });
    //       //   setLocation({ longitude, latitude });
    //     }
    //   );
    // })();

    // return () => subscription?.remove();
    setCurrentLocation();
  }, []);

  return { location, errorMsg, loadingLocation: loading };
};
