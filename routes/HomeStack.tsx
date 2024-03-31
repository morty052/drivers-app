import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens";
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

type HomeStackParamList = {
  Home: undefined;
  Earnings: undefined;
  Profile: undefined;
  Inbox: undefined;
  Account: undefined;
  ReferFriends: undefined;
};

const Drawer = createDrawerNavigator<HomeStackParamList>();

const Stack = createNativeStackNavigator<HomeStackParamList>();

function CustomDrawerContent(props: any) {
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
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
          }}
          source={{ uri: "https://picsum.photos/200" }}
        />
        <Text style={{ color: "white", fontFamily: SEMI_BOLD }}>Jayholms</Text>
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
  return (
    <SocketContextComponent>
      <Drawer.Navigator
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
            drawerLabel: "Home",
            headerTitle: () => <EarningsIndicator />,
            headerTitleAlign: "center",
          }}
          name="Home"
          component={Home}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Earnings",
          }}
          name={"Earnings"}
          component={Home}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Profile",
          }}
          name="Profile"
          component={Home}
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
            drawerLabel: "Account",
          }}
          name="Account"
          component={Home}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Refer Friends",
          }}
          name="ReferFriends"
          component={Home}
        />
      </Drawer.Navigator>
    </SocketContextComponent>
  );
}
