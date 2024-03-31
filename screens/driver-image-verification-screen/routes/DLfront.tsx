import { Button, StyleSheet, Image, View } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";

type Props = {};

const DLfront = (props: Props) => {
  const [image, setImage] = React.useState<null | string>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Image source={{ uri: image as string }} style={styles.image} />
    </View>
  );
};

export default DLfront;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
