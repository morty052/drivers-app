import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  DriverDetails,
  DriverImageVerification,
  DriverPhone,
  Home,
  LocationPermissionScreen,
  LoginScreen,
  RegisterScreen,
  VehicleTypeScreen,
} from "../screens";
import { Header } from "../components";
import { MenuButton } from "../components/menu-button";
import { EarningsIndicator } from "../components/earnings-indicator";
import { HomeStack } from "./HomeStack";
import SocketContextComponent from "../contexts/SocketContextComponent";
import DriverAvatarScreen from "../screens/driver-avatar-screen";
import { OrderScreen } from "../screens/0rder-screen";
import { orderProps } from "../types/order";
import { BackButton } from "../components/back-button";
import Test from "../screens/Test";

type Props = {};
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
