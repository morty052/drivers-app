import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  DriverDetails,
  DriverImageVerification,
  Home,
  LocationPermissionScreen,
  LoginScreen,
  RegisterScreen,
} from "../screens";
import { Header } from "../components";
import { MenuButton } from "../components/menu-button";
import { EarningsIndicator } from "../components/earnings-indicator";
import { HomeStack } from "./HomeStack";
import SocketContextComponent from "../contexts/SocketContextComponent";

type Props = {};
type RootStackParamList = {
  HomeStack: undefined;
  Login: undefined;
  Register: undefined;
  DriverDetails: {
    email: string;
  };
  ImageVerification: undefined;
  LocationPermission: undefined;
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
      <Stack.Screen
        name="ImageVerification"
        component={DriverImageVerification}
      />
      <Stack.Screen
        name="LocationPermission"
        component={LocationPermissionScreen}
      />
      <Stack.Screen options={{}} name="HomeStack" component={HomeStack} />
    </Stack.Navigator>
  );
};

export default AppStack;
