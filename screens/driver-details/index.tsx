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

export const DriverDetails = ({ navigation, route }: any) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const { email } = route.params;

  const { setDriverNames } = useOnboardingStore();

  function handlePress() {
    if (!firstName || !lastName) {
      return;
    }
    setDriverNames(firstName, lastName);
    navigation.navigate("DriverPhone");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={styles.mainText}>What's your name?</Text>
            <Text style={styles.subtitle}>
              Let us know how we can address you.
            </Text>
            <View style={styles.inputsContainer}>
              <TextInput
                autoFocus
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
                placeholderTextColor={Colors.dark}
                placeholder="First Name"
                style={styles.input}
              />
              <TextInput
                value={lastName}
                onChangeText={(text) => setLastName(text)}
                placeholderTextColor={Colors.dark}
                placeholder="Last Name"
                style={styles.input}
              />
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
    padding: 10,
  },
  mainText: {
    fontFamily: SEMI_BOLD,
    color: Colors.dark,
    fontSize: 24,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
  },
  inputsContainer: {
    gap: 20,
    paddingTop: 28,
  },
  input: {
    backgroundColor: Colors.gray,
    padding: 20,
    borderRadius: 10,
  },
});
