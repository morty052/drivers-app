import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  DriverDetails,
  DriverImageVerification,
  DriverPhone,
  LocationPermissionScreen,
  LoginScreen,
  RegisterScreen,
  VehicleTypeScreen,
} from "../screens";

import { HomeStack } from "./HomeStack";
import DriverAvatarScreen from "../screens/driver-avatar-screen";
import { OrderScreen } from "../screens/0rder-screen";
import { orderProps } from "../types/order";
import { BackButton } from "../components/back-button";
import Test from "../screens/Test";

type RootStackParamList = {
  HomeStack: undefined;
  Login: undefined;
  Register: undefined;
  DriverDetails: undefined;
  DriverPhone: undefined;
  DriverVehicle: undefined;
  ImageVerification: undefined;
  DriverAvatar: undefined;
  LocationPermission: undefined;
  OrderScreen: {
    order: orderProps;
  };
  Test: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = ({ ONBOARDED }: { ONBOARDED?: boolean }) => {
  return (
    <Stack.Navigator
      initialRouteName={ONBOARDED ? "HomeStack" : "Login"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="DriverDetails" component={DriverDetails} />
      <Stack.Screen name="DriverPhone" component={DriverPhone} />
      <Stack.Screen name="DriverVehicle" component={VehicleTypeScreen} />
      <Stack.Screen
        name="ImageVerification"
        component={DriverImageVerification}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: "",
        }}
        name="DriverAvatar"
        component={DriverAvatarScreen}
      />
      <Stack.Screen
        name="LocationPermission"
        component={LocationPermissionScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerLeft: () => <BackButton />,
        }}
        name="OrderScreen"
        component={OrderScreen}
      />
      <Stack.Screen options={{}} name="HomeStack" component={HomeStack} />
      <Stack.Screen options={{}} name="Test" component={Test} />
    </Stack.Navigator>
  );
};

export default AppStack;
