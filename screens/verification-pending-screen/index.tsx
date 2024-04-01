import { Platform, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "../../components/ui";
import { MEDIUM, SEMI_BOLD } from "../../constants/fontNames";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { getItem, removeItem, setItem } from "../../utils/storage";
import { baseUrl } from "../../constants/baseUrl";
import { useQuery } from "@tanstack/react-query";
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";
import { useNavigation } from "@react-navigation/native";

type Props = {};

function ProgressBar() {
  return (
    <View style={{ gap: 5 }}>
      <Text fontFamily={SEMI_BOLD}>Step 2 of 3 </Text>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}></View>
      </View>
    </View>
  );
}

function InfoContainer() {
  return (
    <View style={styles.infoContainer}>
      <Ionicons name="information-circle-outline" size={30} />
      <Text>
        You will begin recieving orders around your location immediately all the
        steps below are completed
      </Text>
    </View>
  );
}

function StepItem({
  title,
  pending,
  icon,
}: {
  title: string;
  pending?: boolean;
  icon?: any;
}) {
  return (
    <View
      style={{
        height: 80,
        backgroundColor: Colors.gray,
        borderRadius: 25,
        paddingHorizontal: 20,
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
      }}
    >
      {!pending && (
        <Ionicons
          color={Colors.primary}
          name="checkmark-circle-outline"
          size={30}
        />
      )}
      {pending && <Ionicons color={Colors.darkGrey} name={icon} size={30} />}
      <Text style={{ flex: 1 }}>{title}</Text>
      {pending && (
        <View
          style={{
            backgroundColor: Colors.primary,
            width: 70,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.21,
            shadowRadius: 7.68,
            elevation: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 10 }}>Pending</Text>
        </View>
      )}
    </View>
  );
}

async function fetchVerificationStatus() {
  const _id = getItem("_id");
  const res = await fetch(`${baseUrl}/drivers/verification-status?_id=${_id}`);
  const data = await res.json();
  return data;
}

export const VerificationPendingScreen = () => {
  const {
    data: status,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["verification-status"],
    queryFn: fetchVerificationStatus,
  });

  const navigation = useNavigation();

  async function checkStatus() {
    const data = await fetchVerificationStatus();
    const { verified } = data ?? {};
    if (verified) {
      setItem("VERIFIED", "TRUE");
      // @ts-ignore
      navigation.navigate("Home");
    } else {
      console.info("NOT VERIFIED");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View>
          <Text fontFamily={SEMI_BOLD} style={styles.headerText}>
            Pending verification
          </Text>
          <Text fontFamily={MEDIUM} style={styles.subtitle}>
            We are verifying the information you provided keep an eye on your
            mailbox for verification status
          </Text>
        </View>
        <InfoContainer />
        <ProgressBar />
        <View style={styles.stepsContainer}>
          <StepItem title="Submit required information" />
          <StepItem
            icon={"document-text-outline"}
            pending
            title="Verify identity"
          />
          <StepItem icon={"person"} pending title="Complete your profile" />
          <View style={{ paddingTop: 20 }}>
            <Button
              onPress={() => {
                // removeItem("ONBOARDED");
                checkStatus();
              }}
              variant="dark"
              title="Check status"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: Platform.select({ ios: 20, android: 30 }),
    gap: 20,
  },
  headerText: {
    fontSize: 30,
    color: Colors.dark,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.dark,
  },
  infoContainer: {
    marginTop: 10,
    height: 100,
    width: "100%",
    backgroundColor: "rgb(235 242  253)",
    borderRadius: 10,
    paddingHorizontal: 25,
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarContainer: {
    height: 4,
    width: "100%",
    backgroundColor: "gray",
    borderRadius: 10,
  },
  progressBar: {
    height: 4,
    width: "70%",
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
  stepsContainer: {
    gap: 10,
    paddingTop: 20,
  },
});
