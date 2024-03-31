import { useState } from "react";
import { Button, Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useCameraPermission } from "react-native-vision-camera";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DLfront from "./routes/DLfront";
import DLback from "./routes/DLback";

const Stack = createNativeStackNavigator();

export function DriverImageVerification() {
  const [image, setImage] = useState<null | string>(null);
  const { hasPermission, requestPermission } = useCameraPermission();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="front" component={DLfront} />
      <Stack.Screen name="back" component={DLback} />
      <Stack.Screen name="selfie" component={DLback} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});