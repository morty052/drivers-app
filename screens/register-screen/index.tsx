import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/colors";
import { SEMI_BOLD } from "../../constants/fontNames";
import { useOnboardingStore } from "../../models/onBoardingStore";

export const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { setLoginDetails } = useOnboardingStore();

  async function handleRegister() {
    if (!email || !password) {
      return;
    }
    setLoginDetails(email, password);
    navigation.navigate("DriverDetails", { email });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "ghostwhite" }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.subtitle}>
            Please enter your email and password to continue
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <Pressable onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
        <Text
          onPress={() => navigation.navigate("Login")}
          style={styles.signupLinkText}
        >
          Already have an account?
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "ghostwhite",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  welcomeText: {
    fontFamily: SEMI_BOLD,
    fontSize: 24,
    marginBottom: 2,
    color: Colors.dark,
  },
  subtitle: {
    fontFamily: SEMI_BOLD,
    fontSize: 14,
    color: Colors.dark,
  },
  inputContainer: {
    gap: 20,
    paddingVertical: 20,
  },
  input: {
    borderWidth: 1,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontFamily: SEMI_BOLD,
    fontSize: 20,
  },
  signupLinkText: {
    color: Colors.link,
    textAlign: "center",
    fontFamily: SEMI_BOLD,
    fontSize: 14,
    marginTop: 20,
  },
});
