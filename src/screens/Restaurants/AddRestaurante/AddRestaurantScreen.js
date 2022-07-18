import React from "react";
import { ScrollView } from "react-native";
import {
  InfoForm,
  UploadImagesForm,
} from "../../../components/Restaurantes/AddRestaurantes";
import { styles } from "./AddRestaurante.styles";
import { Button } from "@rneui/themed";
import { useFormik } from "formik";
import { initialValue, validationSchema } from "./AddRestaurantScreen.data";
import { ImageRestaurante } from "../../../components/Restaurantes/AddRestaurantes";
import { v4 as uuid } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../utils";
import { useNavigation } from "@react-navigation/native";

export function AddRestaurantScreen() {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue;
        newData.id = uuid();
        newData.createAt = new Date();

        const myDb = doc(db, "restaurantes", newData.id);
        await setDoc(myDb, newData);

        // await setDoc(doc(db, "restaurantes", newData.id), newData) //lo mismo que las lineas de arriba
        navigation.goBack();
      } catch (error) {}
    },
  });
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageRestaurante images={formik.values.images} />

      <InfoForm formik={formik} />

      <UploadImagesForm formik={formik} />

      <Button
        title="Crear Restaurante"
        buttonStyle={styles.addRestaurante}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </ScrollView>
  );
}
