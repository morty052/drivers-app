import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/colors";
import { SEMI_BOLD } from "../../constants/fontNames";
import { baseUrl } from "../../constants/baseUrl";
import { getItem, setItem } from "../../utils/storage";

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);

  const handleLogin = React.useCallback(async () => {
    try {
      if (!email || !password) {
        throw "Please enter both fields to continue";
      }

      setLoading(true);
      const expo_push_token = getItem("expo_push_token");
      const res = await fetch(
        `${baseUrl}/drivers/login?email=${email}&password=${password}&expo_push_token=${expo_push_token}`
      );
      const data = await res.json();
      const { status, driver } = data;

      if (status.error) {
        console.error(status);
        setLoading(false);
        throw "Invalid email or password";
      }

      const { firstname, lastname, vehicle, avatar, _id, phone, verified } =
        driver;

      const driverDetails = {
        _id,
        email,
        firstname,
        lastname,
        phone,
        avatar,
        vehicle,
      };

      setItem("_id", `${_id}`);
      setItem("email", `${email}`);
      setItem("firstname", `${firstname}`);
      setItem("lastname", `${lastname}`);
      setItem("phone", `${phone}`);
      setItem("avatar", `${avatar}`);
      setItem("vehicle", `${vehicle}`);
      setItem("DRIVER_DETAILS", JSON.stringify(driverDetails));
      setItem("ONBOARDED", "TRUE");
      if (verified) {
        setItem("VERIFIED", "TRUE");
      }
      navigation.navigate("HomeStack");
    } catch (error) {
      setError(error as string);
      setLoading(false);
      console.error(error);
    }
  }, [email, password, navigation]);

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
          {error && (
            <Text style={{ color: "red", textAlign: "center", fontSize: 12 }}>
              {error}
            </Text>
          )}
          <Text onPress={() => navigation.navigate("HomeStack")}>
            Forgot Password?
          </Text>
        </View>
        <Pressable onPress={handleLogin} style={styles.button}>
          {!loading && <Text style={styles.buttonText}>Login</Text>}
          {loading && <ActivityIndicator size={40} color={"white"} />}
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
