import { useState } from "react";
import { Button, Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useCameraPermission } from "react-native-vision-camera";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DLfront from "./routes/DLfront";
import DLback from "./routes/DLback";
import VerificationInfoScreen from "./routes/VerificationInfoScreen";
import SelfieVerification from "./routes/SelfieVerification";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export function DriverImageVerification({ navigation }: any) {
  const [image, setImage] = useState<null | string>(null);
  const { hasPermission, requestPermission } = useCameraPermission();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="VerificationInfo"
        component={VerificationInfoScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: "",
        }}
        name="DLFront"
        component={DLfront}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: "",
        }}
        name="DLBack"
        component={DLback}
      />
      <Stack.Screen
        // options={{
        //   headerShown: true,
        //   headerShadowVisible: false,
        //   headerTitle: "",
        //   headerStyle: { backgroundColor: Colors.darkGrey },
        //   headerLeft: () => (
        //     <Ionicons
        //       onPress={() => navigation.goBack()}
        //       name="arrow-back"
        //       size={24}
        //       color="white"
        //     />
        //   ),
        // }}
        name="SelfieVerification"
        component={SelfieVerification}
      />
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
