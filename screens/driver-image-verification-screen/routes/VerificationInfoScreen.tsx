import { StyleSheet, View, Image, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../../../components/ui";
import Colors from "../../../constants/colors";
import { MEDIUM, SEMI_BOLD } from "../../../constants/fontNames";
import uploadDlImage from "../../../assets/uploaddl.jpg";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
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

const VerificationInfoScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={{ gap: 30 }}>
          <View>
            <Text fontFamily={SEMI_BOLD} style={styles.headerText}>
              Verify your identity
            </Text>
            <Text fontFamily={MEDIUM} style={styles.subtitle}>
              To complete setting up your profile you will need to provide an
              image of your driver's license and a clear picture of your face.
            </Text>
          </View>
          <Image style={styles.image} source={uploadDlImage} />
        </View>
        <SafeAreaView>
          <View style={styles.buttonsContainer}>
            <BackButton />
            <NextButton handlePress={() => navigation.navigate("DLFront")} />
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
};

export default VerificationInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 30,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 30,
    marginBottom: 5,
    color: Colors.dark,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark,
    marginLeft: 4,
  },
  image: {
    width: "100%",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
});
