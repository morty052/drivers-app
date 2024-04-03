import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/colors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getItem } from "../../utils/storage";
import { Text } from "../../components/ui";
import { SEMI_BOLD } from "../../constants/fontNames";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

const Stack = createNativeStackNavigator();

function SettingsItem({
  title,
  subtitle,
  editable,
}: {
  title: string;
  subtitle: string;
  editable?: boolean;
}) {
  return (
    <View
      style={{
        paddingBottom: 12,
        borderBottomWidth: 2,
        borderColor: Colors.gray,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, color: Colors.light }}>{title}</Text>
        <Text style={{ fontSize: 20, color: Colors.light }}>{subtitle}</Text>
      </View>
      {editable && (
        <Ionicons name="chevron-forward-outline" size={20} color="white" />
      )}
    </View>
  );
}

export const SettingsHomePage = () => {
  const firstname = getItem("firstname");
  const lastname = getItem("lastname");
  const phone = getItem("phone");
  const email = getItem("email");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.darkGrey }}>
      <View style={styles.container}>
        <ScrollView>
          {/* HEADER */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 10,
            }}
          >
            <Text style={styles.name}>{firstname}</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: Colors.light,
                height: 60,
                width: 60,
                borderRadius: 30,
              }}
            ></View>
          </View>
          {/* HR */}
          <View style={{ backgroundColor: Colors.gray, height: 1 }}></View>

          <View style={{ paddingTop: 20, gap: 20 }}>
            <Text fontFamily={SEMI_BOLD} style={styles.headerText}>
              Basic Info
            </Text>
            <SettingsItem title="Name" subtitle={firstname + " " + lastname} />
            <SettingsItem
              editable
              title="Phone Number"
              subtitle={phone as string}
            />
            <SettingsItem editable title="Email" subtitle={email as string} />
            <SettingsItem
              editable
              title="Address"
              subtitle={"10 bing rd, hampton, ON"}
            />
            <SettingsItem
              editable
              title="Vehicle Type"
              subtitle={"Motorbike"}
            />
          </View>
          {/* PAYMENT INFO   */}
          <View
            style={{
              marginTop: 20,
              gap: 20,
              backgroundColor: Colors.light,
              padding: 20,
              borderRadius: 20,
            }}
          >
            <Text
              fontFamily={SEMI_BOLD}
              style={{
                fontSize: 25,
                color: Colors.darkGrey,
              }}
            >
              Payment Information
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBottom: 10,
                borderBottomWidth: 2,
                borderColor: Colors.darkGrey,
              }}
            >
              <Text>Name</Text>
              <Text>{firstname + " " + lastname}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBottom: 10,
                borderBottomWidth: 2,
                borderColor: Colors.darkGrey,
              }}
            >
              <Text>Account #</Text>
              <Text>123456789999</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBottom: 10,
                borderBottomWidth: 2,
                borderColor: Colors.darkGrey,
              }}
            >
              <Text>Bank name</Text>
              <Text>Good Bank</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export const SettingsScreen = (props: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SettingsHomePage" component={SettingsHomePage} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 25,
    color: Colors.light,
  },
  name: {
    color: Colors.light,
    fontSize: 20,
  },
});
