import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { styles } from "./UploadImagesForm.styles";
import { Icon, Text, Avatar } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { LoadingModal } from "../../../Shared";
import { map, filter } from "lodash";

export function UploadImagesForm(props) {
  const { formik } = props;
  const [loading, setLoading] = useState(false);

  const openGalery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setLoading(true);
      uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `restaurante/${uuid()}`);

    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhotosRestaurante(snapshot.metadata.fullPath);
    });
  };

  const updatePhotosRestaurante = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);

    const imageUrl = await getDownloadURL(imageRef);

    formik.setFieldValue("images", [...formik.values.images, imageUrl]);

    setLoading(false);
  };

  const removeImage = (img) => {
    Alert.alert(
      "Eliminar Imagen",
      "Esta seguro que quiere eliminar esta imagen?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => {
            const result = filter(
              formik.values.images,
              (image) => image !== img
            );
            formik.setFieldValue("images", result);
          },
        },
      ]
    );
  };

  return (
    <>
      <ScrollView
        style={styles.viewImage}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <Icon
          type="material-comunity"
          name="photo"
          color="#a7a7a7"
          containerStyle={styles.containerIcon}
          onPress={openGalery}
        />
        {map(formik.values.images, (image) => (
          <Avatar
            key={image}
            source={{ uri: image }}
            containerStyle={styles.imageStyles}
            onPress={() => removeImage(image)}
          />
        ))}
      </ScrollView>
      <Text style={styles.error}>{formik.errors.images}</Text>
      <LoadingModal show={loading} text="Subiendo Imagen" />
    </>
  );
}
