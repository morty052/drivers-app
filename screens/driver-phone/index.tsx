import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SEMI_BOLD } from "../../constants/fontNames";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useOnboardingStore } from "../../models/onBoardingStore";

type Props = {};

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={{
        backgroundColor: Colors.gray,
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
      }}
    >
      <Ionicons size={30} name="arrow-back" />
    </Pressable>
  );
};

const NextButton = ({ handlePress }: { handlePress: () => void }) => {
  return (
    <Pressable
      onPress={handlePress}
      style={{
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
      }}
    >
      <Text style={{ fontSize: 20, fontFamily: SEMI_BOLD, color: "white" }}>
        Next
      </Text>
    </Pressable>
  );
};

export const DriverPhone = ({ navigation, route }: any) => {
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const { setPhone } = useOnboardingStore();

  function handlePhoneNumberChange(number: string) {
    setPhoneNumber(number);
  }

  function handlePress() {
    if (!phoneNumber) {
      return;
    }

    const number = `${"+1"}${phoneNumber}`;
    setPhone(number);
    navigation.navigate("DriverVehicle");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={styles.mainText}>Enter your mobile number</Text>
            <Text style={styles.subtitle}>
              We need this information to verify your identity.
            </Text>
            <View style={styles.inputsContainer}>
              <View
                style={{
                  width: 65,
                  backgroundColor: Colors.gray,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 30 }}>🇨🇦</Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={{ fontSize: 20 }}>+1</Text>
                <TextInput
                  autoFocus
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={(text) => handlePhoneNumberChange(text)}
                  placeholderTextColor={Colors.dark}
                  placeholder=""
                  style={styles.input}
                />
              </View>
            </View>
          </View>
          <SafeAreaView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 20,
              }}
            >
              <BackButton />
              <NextButton handlePress={handlePress} />
            </View>
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    flex: 1,
    justifyContent: "space-between",
  },
  innerContainer: {
    paddingTop: 10,
  },
  mainText: {
    fontFamily: SEMI_BOLD,
    color: Colors.dark,
    fontSize: 24,
  },
  subtitle: {
    marginTop: 5,
    fontSize: 16,
  },
  inputsContainer: {
    gap: 10,
    flexDirection: "row",
    paddingTop: 28,
  },
  inputContainer: {
    backgroundColor: Colors.gray,
    padding: 20,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    // backgroundColor: Colors.gray,
    // padding: 20,
    // borderRadius: 10,
    fontSize: 20,
    flex: 1,
  },
});
