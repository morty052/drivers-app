import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./routes/AppStack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { getItem } from "./utils/storage";

export default function App() {
  const [ONBOARDED, setONBOARDED] = React.useState<boolean | null>(null);
  SplashScreen.preventAutoHideAsync();

  React.useEffect(() => {
    const ONBOARDED = getItem("ONBOARDED");
    if (!ONBOARDED) {
      SplashScreen.hideAsync();
      return;
    }
    setONBOARDED(true);
    SplashScreen.hideAsync();
  }, []);

  if (!ONBOARDED) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppStack ONBOARDED={ONBOARDED} />
      </NavigationContainer>
      <StatusBar style="dark" />
    </GestureHandlerRootView>
  );
}
