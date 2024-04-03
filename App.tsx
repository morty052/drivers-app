import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./routes/AppStack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { getItem, setItem } from "./utils/storage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform, View, Text } from "react-native";
import Constants from "expo-constants";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants?.expoConfig?.extra?.eas.projectId,
    });
    const { data } = token;

    console.log(data);
    setItem("expo_push_token", `${data}`);
    await SplashScreen.hideAsync();
  } else {
    alert("Must use physical device for Push Notifications");
    await SplashScreen.hideAsync();
  }

  return token?.data;
}

export default function App() {
  const [ONBOARDED, setONBOARDED] = React.useState<boolean | null>(null);
  const [expoPushToken, setExpoPushToken] = React.useState<string | undefined>(
    ""
  );
  const [notification, setNotification] = React.useState<boolean | any>(false);
  const notificationListener = React.useRef<Notifications.Subscription>();
  const responseListener = React.useRef<Notifications.Subscription>();
  SplashScreen.preventAutoHideAsync();

  const client = React.useMemo(() => new QueryClient(), []);

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        const { verificationNotification } = notification.request.content.data;
        if (verificationNotification) {
          console.log(notification.request.content.data);
          setItem("VERIFIED", "TRUE");
        }
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current as Notifications.Subscription
      );
      Notifications.removeNotificationSubscription(
        responseListener.current as Notifications.Subscription
      );
    };
  }, []);

  React.useEffect(() => {
    const ONBOARDED = getItem("ONBOARDED");
    if (!ONBOARDED) {
      setONBOARDED(false);
      return;
    }
    setONBOARDED(true);
  }, []);

  if (ONBOARDED == null) {
    console.log("ONBOARDED", ONBOARDED);
    return (
      <View style={{ flex: 1, backgroundColor: "red" }}>
        <Text>kkk</Text>
      </View>
    );
  }

  return (
    <QueryClientProvider client={client}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <AppStack ONBOARDED={ONBOARDED} />
        </NavigationContainer>
        <StatusBar style="dark" />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
