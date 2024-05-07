import { Pressable, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "../../../components/ui";
import Colors from "../../../constants/colors";
import { SEMI_BOLD } from "../../../constants/fontNames";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import React from "react";

const AnimatedButton = Animated.createAnimatedComponent(Pressable);

const InteractionButtons = ({
  handleOnline,
  focusDriver,
  online,
}: {
  handleOnline: () => Promise<void>;
  focusDriver: () => void;
  online: boolean;
}) => {
  const [loading, setLoading] = React.useState(false);

  const backgroundColor = useSharedValue("white");
  const height = useSharedValue(75);
  const width = useSharedValue(75);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
    };
  });
  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      height: 70,
      width: 70,
    };
  });

  async function changeBg() {
    setLoading(true);
    handleOnline();
    backgroundColor.value = withRepeat(
      withTiming("gray", { duration: 1000 }),
      4,
      true
    );
    setLoading(false);
  }

  if (online) {
    return null;
  }

  return (
    <View
      style={{
        position: "absolute",
        // backgroundColor: "red",
        left: 0,
        right: 0,
        bottom: "12%",
        zIndex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 20,
      }}
    >
      <Pressable
        style={{
          height: 40,
          width: 40,
          borderRadius: 20,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          elevation: 10,
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
        }}
        // onPress={() => {
        //   setItem("latitude", "43.9395387");
        //   setItem("longitude", "-78.81455");
        // }}
      >
        <Ionicons name="storefront-outline" size={25} color="black" />
      </Pressable>
      <AnimatedButton
        onPress={() => changeBg()}
        style={[styles.onlineButtonContainer, animatedStyle]}
      >
        <Animated.View style={[styles.onlineButton, animatedButtonStyle]}>
          <Text style={styles.onlineButtonText}>Go</Text>
        </Animated.View>
      </AnimatedButton>
      <Pressable
        style={{
          height: 40,
          width: 40,
          borderRadius: 20,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          elevation: 10,
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
        }}
        onPress={focusDriver}
      >
        <Ionicons name="location-outline" size={30} color="black" />
      </Pressable>
    </View>
  );
};

export default InteractionButtons;

const styles = StyleSheet.create({
  onlineButtonContainer: {
    height: 80,
    width: 80,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  onlineButton: {
    borderRadius: 50,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    //   elevation: 10,
  },
  onlineButtonText: {
    fontSize: 25,
    color: "white",
    fontFamily: SEMI_BOLD,
  },
});
