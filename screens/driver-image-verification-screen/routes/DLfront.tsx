import { StyleSheet, Image, View, Dimensions, ScrollView } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import allfouredges from "../../../assets/allfouredges.png";
import notblurry from "../../../assets/notblurry.png";
import noglare from "../../../assets/noglare.png";
import { Button, Text } from "../../../components/ui";
import { MEDIUM, SEMI_BOLD } from "../../../constants/fontNames";
import { uploadImage } from "../../../utils/sanityClient";
import { useOnboardingStore } from "../../../models/onBoardingStore";

type Props = {};

const { height, width } = Dimensions.get("window");

const DLfront = ({ navigation }: any) => {
  const [image, setImage] = React.useState<null | string>(null);
  const [loading, setLoading] = React.useState(false);

  const { setDlFront } = useOnboardingStore();

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

  const uploadDL = async () => {
    if (!image || loading) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(image);
      const image_blob = await res.blob();
      const _id = await uploadImage(image_blob);
      setDlFront(_id as string);
      console.log(_id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  async function handleNext() {
    if (image) {
      await uploadDL();
      navigation.navigate("DLBack");
    }
  }
  return (
    <View style={styles.container}>
      {!image && (
        <ScrollView>
          <View style={{ paddingHorizontal: 10 }}>
            <Text
              fontFamily={SEMI_BOLD}
              style={{ fontSize: 20, marginBottom: 5 }}
            >
              Upload the front of your driver's license
            </Text>
            <Text>For best results follow guidelines below</Text>
          </View>
          <View>
            <Image
              resizeMode="contain"
              style={{ width: "100%", height: 150 }}
              source={allfouredges}
            />
            <Text style={{ marginLeft: 10 }}>
              Capture all four edges of license
            </Text>
          </View>
          <View>
            <Image
              resizeMode="contain"
              style={{ width: "100%", height: 150 }}
              source={notblurry}
            />
            <Text style={{ marginLeft: 10 }}>Avoid using blurry images</Text>
          </View>
          <View>
            <Image
              resizeMode="contain"
              style={{ width: "100%", height: 150 }}
              source={noglare}
            />
            <Text style={{ marginLeft: 10 }}>
              Avoid using images with glare
            </Text>
          </View>
        </ScrollView>
      )}

      {!image && (
        <View style={{ paddingBottom: 40, gap: 20 }}>
          <Button variant="primary" title="Upload Image" onPress={pickImage} />
        </View>
      )}
      {image && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            // backgroundColor: "red",
            paddingHorizontal: 10,
            gap: 10,
          }}
        >
          <Image
            resizeMode="center"
            source={{ uri: image as string }}
            style={styles.image}
          />
          <Text
            style={{ textAlign: "center", fontSize: 16 }}
            fontFamily={MEDIUM}
          >
            Is the front of your driver's license readable?
          </Text>
        </View>
      )}
      {image && (
        <View style={{ paddingBottom: 40, gap: 20 }}>
          {!loading && (
            <Button variant="dark" title="Upload Again" onPress={pickImage} />
          )}

          <Button
            loading={loading}
            variant="primary"
            title="Looks Good"
            onPress={handleNext}
          />
        </View>
      )}
    </View>
  );
};

export default DLfront;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  image: {
    width: width * 0.98,
    height: width,
  },
});
