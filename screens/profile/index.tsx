import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { getItem } from "../../utils/storage";
import { VerificationPendingScreen } from "../verification-pending-screen";
import { MenuButton } from "../../components/menu-button";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton } from "../../components/back-button";
import Colors from "../../constants/colors";
import { MEDIUM, SEMI_BOLD } from "../../constants/fontNames";
import { Text } from "../../components/ui";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

function DeliveryInfo() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        alignSelf: "center",
        alignItems: "center",
        gap: 40,
      }}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <View>
          <Text
            style={{ textAlign: "center", fontSize: 20 }}
            fontFamily={SEMI_BOLD}
          >
            0
          </Text>
          <Text style={{ textAlign: "center", fontSize: 12 }}>Deliveries</Text>
        </View>
      </View>
      <View
        style={{ height: 30, width: 2, backgroundColor: Colors.accent }}
      ></View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View>
          <Text
            style={{ textAlign: "center", fontSize: 20 }}
            fontFamily={SEMI_BOLD}
          >
            0%
          </Text>
          <Text style={{ textAlign: "center", fontSize: 12 }}>
            Satisfaction rate
          </Text>
        </View>
      </View>
    </View>
  );
}

function Bio() {
  return (
    <View style={{ backgroundColor: Colors.primary }}>
      <Text style={{ textAlign: "center", color: "white" }}>Who i am</Text>
      <Text
        fontFamily={SEMI_BOLD}
        style={{ textAlign: "center", color: "white", fontSize: 25 }}
      >
        {" "}
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente eos
        vitae voluptatem animi dolorem "
      </Text>
    </View>
  );
}

function Languages() {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 5,
        paddingHorizontal: 10,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: Colors.gray,
        paddingVertical: 20,
      }}
    >
      <Ionicons name="globe-outline" size={24} color="black" />
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Text>Speaks</Text>
        <Text fontFamily={MEDIUM}>English,</Text>
        <Text fontFamily={MEDIUM}>Spanish,</Text>
        <Text fontFamily={MEDIUM}>German</Text>
      </View>
    </View>
  );
}

function CustomerCompliments() {
  return (
    <View>
      <Text>Customer Compliments</Text>
    </View>
  );
}

function DriverAddress() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingHorizontal: 10,
        paddingBottom: 20,
        borderBottomWidth: 2,
        borderColor: Colors.gray,
      }}
    >
      <Ionicons name="location-outline" size={24} color="black" />
      <Text>10 Rogerio apapa way, bronx ontario</Text>
    </View>
  );
}

export const Profile = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <Image
          resizeMode="cover"
          source={{
            uri: "https://th.bing.com/th/id/R.271c861d66e03d7823b5ade4e0fce7c7?rik=ATfl%2fk68OaAwxQ&pid=ImgRaw&r=0",
          }}
          style={styles.image}
        />
        <View style={{ gap: 10 }}>
          <Text style={styles.driverNameText}>Yahmnan</Text>
          <Text style={styles.deliverySinceText}>0 deliveries since 2024</Text>
        </View>
        <DeliveryInfo />
        <Bio />
        <Languages />
        <DriverAddress />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "white",
    gap: 20,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 200,
    alignSelf: "center",
  },
  driverNameText: {
    textAlign: "center",
    fontSize: 30,
    color: Colors.dark,
    fontFamily: SEMI_BOLD,
  },
  deliverySinceText: {
    textAlign: "center",
  },
});
