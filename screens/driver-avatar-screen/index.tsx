import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { useOnboardingStore } from "../../models/onBoardingStore";
import { Button, Text } from "../../components/ui";
import { SEMI_BOLD } from "../../constants/fontNames";
import Colors from "../../constants/colors";
import { uploadImage } from "../../utils/sanityClient";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { setItem } from "../../utils/storage";

type Props = {};

// TODO GET IMAGE FROM SANITY INSTEAD
const DriverAvatarScreen = ({ navigation }: any) => {
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState<null | string>(null);
  const { selfie_link, setAvatar, createDriver } = useOnboardingStore();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUseSelfie = async () => {
    const res = await fetch(selfie_link);
    const image_blob = await res.blob();
    const _id = await uploadImage(image_blob);
    setAvatar(_id as string);
    console.log(_id);
  };

  const handleUseNewImage = async () => {
    const res = await fetch(image as string);
    const image_blob = await res.blob();
    const _id = await uploadImage(image_blob);
    setAvatar(_id as string);
    console.log(_id);
    return;
  };

  const uploadAvatar = async () => {
    if (!image || loading) {
      return;
    }

    setLoading(true);
    try {
      // if (!image) {
      //   handleUseSelfie();
      //   setLoading(false);
      //   return;
      // }
      await handleUseNewImage();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // TODO: ADD ERROR HANDLING
  async function handleNext() {
    // await uploadAvatar();
    // const data = await createDriver();
    // setItem("ONBOARDED", "TRUE");
    // console.info(data);
    navigation.navigate("LocationPermission");
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text fontFamily={SEMI_BOLD} style={styles.headerText}>
          Select profile picture
        </Text>
        <Text style={styles.subtitle}>
          Select a photo of your face that would be displayed on your profile
        </Text>
      </View>
      {!image && (
        <View
          style={{
            height: 250,
            width: 250,
            borderRadius: 250,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: Colors.darkGrey,
          }}
        >
          <Ionicons name="person" size={150} color={Colors.primary} />
        </View>
      )}
      {image && (
        <Image
          resizeMode="cover"
          style={{
            height: 250,
            width: 250,
            borderRadius: 200,
            alignSelf: "center",
          }}
          source={{ uri: image }}
        />
      )}
      {!image && (
        <View style={styles.buttonsContainer}>
          <Button onPress={pickImage} variant="primary" title="Select photo" />
        </View>
      )}
      {image && (
        <View style={styles.buttonsContainer}>
          <Button
            loading={loading}
            onPress={handleNext}
            variant="primary"
            title="Continue"
          />
        </View>
      )}
    </View>
  );
};

export default DriverAvatarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingTop: 0,
    gap: 20,
  },
  textContainer: {
    paddingBottom: 40,
  },
  headerText: {
    fontSize: 25,
    color: Colors.dark,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark,
  },
  image: {},
  buttonsContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 70,
    gap: 20,
  },
});
