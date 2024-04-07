import {
  FlatList,
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MEDIUM, SEMI_BOLD } from "../../constants/fontNames";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useOnboardingStore } from "../../models/onBoardingStore";
import t from "../../assets/store_marker.png";
import car from "../../assets/car.png";
import bike from "../../assets/bike.png";
import bicycle from "../../assets/bicycle.png";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Text } from "../../components/ui";
import { vehicleTypes } from "../../types/vehicleTypes";

type Props = {};

const options = [
  {
    title: "Car",
    image: car,
    value: "Car",
  },
  {
    title: "Motor Bike",
    image: bike,
    value: "MotorBike",
  },
  {
    title: "Bicycle",
    image: bicycle,
    value: "Bicycle",
  },
  // {
  //   title: "Other",
  //   image: bicycle,
  // },
];

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

const OptionItem = ({
  title,
  value,
  setOption,
  active,
  image,
}: {
  title: string;
  active: boolean;
  setOption: (value: vehicleTypes) => void;
  image: ImageSourcePropType;
  value: vehicleTypes;
}) => {
  return (
    <Animated.View
      style={[
        styles.optionContainer,
        {
          backgroundColor: active ? Colors.primary : Colors.gray,
        },
      ]}
    >
      <Pressable onPress={() => setOption(value)} style={[styles.option]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            flex: 1,
          }}
        >
          <Image
            resizeMode="contain"
            style={{ height: 50, width: 50 }}
            source={image}
          />
          <Text
            fontFamily={MEDIUM}
            style={{ color: active ? "white" : Colors.dark, fontSize: 16 }}
          >
            {title}
          </Text>
        </View>
        <Ionicons
          color={active ? "white" : Colors.dark}
          name="checkmark-circle-outline"
          size={30}
        />
      </Pressable>
    </Animated.View>
  );
};

export const VehicleTypeScreen = ({ navigation, route }: any) => {
  const [option, setOption] = React.useState<vehicleTypes>("Car");

  const { setVehicle } = useOnboardingStore();

  function handlePress() {
    if (!option) {
      return;
    }
    setVehicle(option);
    navigation.navigate("ImageVerification");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text fontFamily={SEMI_BOLD} style={styles.mainText}>
            What's your vehicle type?
          </Text>
          <Text style={styles.subtitle}>
            This information does not impact the verification process.
          </Text>
          <View style={styles.allOptionsContainer}>
            <FlatList
              data={options}
              renderItem={({ item }) => (
                <OptionItem
                  value={item.value as vehicleTypes}
                  active={option == item.value}
                  setOption={(value) => setOption(value)}
                  title={item.title}
                  image={item.image}
                />
              )}
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
  allOptionsContainer: {
    paddingTop: 28,
  },
  optionContainer: {
    borderRadius: 20,
    marginBottom: 30,
  },
  option: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
