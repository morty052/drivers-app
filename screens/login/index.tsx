import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/colors";
import { SEMI_BOLD } from "../../constants/fontNames";
import { baseUrl } from "../../constants/baseUrl";
import { setItem } from "../../utils/storage";

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | unknown>();

  async function handleLogin() {
    try {
      if (!email || !password) {
        throw "Please enter both fields to continue";
      }
      const res = await fetch(
        `${baseUrl}/drivers/login?email=${email}&password=${password}`
      );
      const data = await res.json();
      const { status, firstname, lastname, vehicle, avatar, _id, phone } = data;

      const driverDetails = {
        _id,
        email,
        firstname,
        lastname,
        phone,
      };

      if (status.error) {
        console.error(status);
        throw "Something went wrong please check email and password";
      }
      setItem("driverDetails", JSON.stringify(driverDetails));
    } catch (error) {
      setError(error);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "ghostwhite" }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.welcomeText}>Welcome back</Text>
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
          <Text onPress={() => navigation.navigate("HomeStack")}>
            Forgot Password?
          </Text>
        </View>
        <Pressable onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Text
          onPress={() => navigation.navigate("Register")}
          style={styles.signupLinkText}
        >
          Don't have an account?
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
