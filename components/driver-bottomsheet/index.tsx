import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { removeItem } from "../../utils/storage";

type Props = {
  online: boolean;
  setOnline: React.Dispatch<React.SetStateAction<boolean>>;
};

function OfflineSheetView() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Ionicons
        onPress={() => {
          // @ts-ignore
          navigation.navigate("ImageVerification");
        }}
        name="options-outline"
        size={20}
        color={"white"}
      />
      <Text style={styles.onlineText}>You're Offline</Text>
      <Ionicons
        onPress={() => removeItem("ONBOARDED")}
        name="menu"
        size={20}
        color={"white"}
      />
    </View>
  );
}

function OnlineView({
  setOnline,
}: {
  setOnline: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <View>
      <Text onPress={() => setOnline(false)} style={styles.onlineText}>
        You're Online
      </Text>
      <Text style={{ color: "white", textAlign: "center" }}>
        Available orders nearby: 3
      </Text>
    </View>
  );
}

export const DriverBottomSheet = ({ online, setOnline }: Props) => {
  const snapPoints = React.useMemo(
    () => (online ? ["30%", "50%", "70%"] : ["15%"]),
    [online]
  );
  return (
    <BottomSheet
      style={{ borderRadius: 0, zIndex: 4 }}
      handleIndicatorStyle={{ backgroundColor: "white" }}
      backgroundStyle={{
        backgroundColor: Colors.darkGrey,
        borderRadius: 0,
      }}
      index={0}
      snapPoints={snapPoints}
    >
      {!online && <OfflineSheetView />}
      {online && <OnlineView setOnline={setOnline} />}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingBottom: Platform.select({ ios: 30, android: 0 }),
    // backgroundColor: Colors.darkGrey,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // height: "15%",
  },
  onlineText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
});
