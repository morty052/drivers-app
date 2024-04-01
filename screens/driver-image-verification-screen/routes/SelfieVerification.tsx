import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import React from "react";
import {
  useCameraDevice,
  useCameraPermission,
  TakePhotoOptions,
  PhotoFile,
  Camera,
  CameraDevice,
} from "react-native-vision-camera";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Colors from "../../../constants/colors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MEDIUM, SEMI_BOLD } from "../../../constants/fontNames";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import uploadDlImage from "../../../assets/uploaddl.jpg";
import { useOnboardingStore } from "../../../models/onBoardingStore";
import { uploadImage } from "../../../utils/sanityClient";
const Stack = createNativeStackNavigator();

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

const SelfieScreen = ({ navigation }: any) => {
  const device = useCameraDevice("front");

  const { hasPermission, requestPermission } = useCameraPermission();

  const [isActive, setIsActive] = React.useState(false);
  const [flash, setFlash] = React.useState<TakePhotoOptions["flash"]>("off");
  const [isRecording, setIsRecording] = React.useState(false);

  const [photo, setPhoto] = React.useState<PhotoFile>();

  const [breakDown, setBreakDown] = React.useState<null | string>(null);
  const [loading, setLoading] = React.useState(false);

  const camera = React.useRef<Camera>(null);

  const { setSelfie } = useOnboardingStore();

  useFocusEffect(
    React.useCallback(() => {
      setIsActive(true);
      return () => {
        setIsActive(false);
      };
    }, [])
  );

  React.useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const onTakePicturePressed = async () => {
    const photo = await camera.current?.takePhoto({
      flash,
    });
    setPhoto(photo);
    console.log(photo);
  };

  const uploadPhoto = async () => {
    if (!photo || loading) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`file://${photo.path}`);
      const image_blob = await res.blob();

      const _id = await uploadImage(image_blob);
      setSelfie(_id as string, `file://${photo.path}`);
      console.log(_id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleNext = async () => {
    if (photo) {
      await uploadPhoto();
      navigation.navigate("DriverAvatar");
    }
  };

  if (!hasPermission) {
    return null;
  }

  return (
    <View style={[{ backgroundColor: Colors.darkGrey, flex: 1 }]}>
      {!photo && (
        <View
          style={[
            {
              flex: 1,
              paddingTop: 10,
              alignItems: "center",
            },
          ]}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 30,
              marginBottom: 20,
            }}
          >
            Image verification
          </Text>
          <Camera
            orientation="portrait"
            ref={camera}
            style={{ width: "100%", height: "60%" }}
            device={device as CameraDevice}
            isActive={isActive}
            photo
            video
            audio
          />
          <View style={{ gap: 10, paddingTop: 20, paddingHorizontal: 20 }}>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: MEDIUM,
              }}
            >
              Press the button below to take a photo clearly showing your face
            </Text>
          </View>
          <Pressable
            onPress={onTakePicturePressed}
            style={{
              position: "absolute",
              alignSelf: "center",
              bottom: 50,
              width: 75,
              height: 75,
              backgroundColor: isRecording ? "red" : "white",
              borderRadius: 75,
            }}
          />
        </View>
      )}

      {photo && (
        <>
          <Image
            source={{ uri: `file://${photo.path}` }}
            style={{
              width: "100%",
              height: "60%",
              transform: [{ rotate: "90deg" }],
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              paddingBottom: 50,
              alignItems: "center",
            }}
          >
            <Pressable
              onPress={uploadPhoto}
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Colors.primary,
                width: "95%",
                height: 50,
                borderRadius: 10,
                marginBottom: 20,
              }}
            >
              <Text style={{ color: "black", fontSize: 20 }}>Try again</Text>
            </Pressable>
            <Pressable
              onPress={handleNext}
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Colors.light,
                width: "95%",
                height: 50,
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              {!loading && (
                <Text style={{ color: "black", fontSize: 20 }}>Submit</Text>
              )}
              {loading && <ActivityIndicator size={"large"} color={"black"} />}
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
};

const SelfieUploadInfo = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{ gap: 30, paddingTop: 20 }}>
        <View>
          <Text style={styles.headerText}>Image verification</Text>
          <Text style={styles.subtitle}>
            You need to take a clear photo of your face to continue verifying
            your identity
          </Text>
        </View>
        <Image style={styles.image} source={uploadDlImage} />
      </View>
      <SafeAreaView>
        <View style={styles.buttonsContainer}>
          <BackButton />
          <NextButton
            handlePress={() => {
              // @ts-ignore
              navigation.navigate("SelfieScreen");
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

function SelfieVerification({ navigation }: any) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SelfieUploadInfo" component={SelfieUploadInfo} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: "",
          headerStyle: { backgroundColor: Colors.darkGrey },
          headerLeft: () => (
            <Ionicons
              onPress={() => navigation.navigate("SelfieUploadInfo")}
              name="arrow-back"
              size={24}
              color="white"
            />
          ),
        }}
        name="SelfieScreen"
        component={SelfieScreen}
      />
    </Stack.Navigator>
  );
}

export default SelfieVerification;

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
