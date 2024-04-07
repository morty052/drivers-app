import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  EarningsScreen,
  Home,
  Profile,
  SettingsScreen,
  VerificationPendingScreen,
} from "../screens";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import SocketContextComponent from "../contexts/SocketContextComponent";
import { MenuButton } from "../components/menu-button";
import { EarningsIndicator } from "../components/earnings-indicator";
import Colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { MEDIUM, SEMI_BOLD } from "../constants/fontNames";
import { View, Text, Image } from "react-native";
import { getItem, removeItem } from "../utils/storage";
import React from "react";

type HomeStackParamList = {
  Home: undefined;
  Earnings: undefined;
  Profile: undefined;
  Inbox: undefined;
  Settings: undefined;
  ReferFriends: undefined;
  Pending: undefined;
};

const Drawer = createDrawerNavigator<HomeStackParamList>();

const Stack = createNativeStackNavigator<HomeStackParamList>();

function CustomDrawerContent(props: any) {
  const firstname = getItem("firstname");
  const avatar = getItem("avatar");
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          padding: 15,
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Image
          resizeMode="cover"
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
          }}
          source={{ uri: avatar }}
        />
        <Text
          onPress={() => {
            removeItem("ONBOARDED");
            removeItem("VERIFIED");
          }}
          style={{ color: "white", fontFamily: SEMI_BOLD }}
        >
          {firstname}
        </Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const options = {
  headerLeft: () => <MenuButton />,
  headerTitle: () => <EarningsIndicator />,
  headerShown: true,
  headerTitleAlign: "center",
  headerTransparent: true,
  headerBackVisible: false,
};

export function HomeStack() {
  const verified = getItem("VERIFIED");
  return (
    <SocketContextComponent>
      <Drawer.Navigator
        initialRouteName={verified ? "Home" : "Pending"}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerLeft: () => <MenuButton />,
          headerTransparent: true,
          headerTitle: "",
          drawerStyle: {
            backgroundColor: Colors.darkGrey,
          },
          drawerItemStyle: {
            backgroundColor: "transparent",
          },
          drawerLabelStyle: {
            fontSize: 25,
            fontFamily: MEDIUM,
            letterSpacing: 1,
          },
          drawerActiveTintColor: Colors.primary,
          drawerInactiveTintColor: "white",
        }}
      >
        <Drawer.Screen
          options={{
            headerLeft: () => null,
          }}
          name="Home"
          component={Home}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Earnings",
          }}
          name={"Earnings"}
          component={EarningsScreen}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Profile",
            headerTransparent: true,
          }}
          name="Profile"
          component={Profile}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Inbox",
          }}
          name="Inbox"
          component={Home}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Settings",
          }}
          name="Settings"
          component={SettingsScreen}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Refer Friends",
          }}
          name="ReferFriends"
          component={Home}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "",
            headerShown: false,
            drawerItemStyle: {
              display: "none",
            },
          }}
          name="Pending"
          component={VerificationPendingScreen}
        />
      </Drawer.Navigator>
    </SocketContextComponent>
  );
}
