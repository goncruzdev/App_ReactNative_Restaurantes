import React from "react";
import { View } from "react-native";
import { styles } from "./AddReviewRestauranteScreen.styles";
import { Button, AirbnbRating, Input } from "@rneui/themed";
import { useFormik } from "formik";
import {
  initialValues,
  validationSchema,
} from "./AddReviewRestauranteScreen.data";
import { async } from "@firebase/util";
import Toast from "react-native-toast-message";
import { getAuth } from "firebase/auth";
import {
  doc,
  setDoc,
  query,
  collection,
  where,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../utils";
import { v4 as uuid } from "uuid";
import { map, mean } from "lodash";
import { useNavigation } from "@react-navigation/native";

export function AddReviewRestauranteScreen({ route }) {
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        const idDoc = uuid();

        const newData = formValue;
        newData.id = idDoc;
        newData.idRestaurante = route.params.idRestaurante;
        newData.idUser = auth.currentUser.uid;
        newData.avatar = auth.currentUser.photoURL;
        newData.createAt = new Date();

        await setDoc(doc(db, "reviews", idDoc), newData);
        await updateRestaurante();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Ha ocurrido un erro intente de nuevo mas tarde",
        });
      }
    },
  });

  const updateRestaurante = async () => {
    const q = query(
      collection(db, "reviews"),
      where("idRestaurante", "==", route.params.idRestaurante)
    );

    onSnapshot(q, async (snapshot) => {
      const reviews = snapshot.docs;
      const arrayStars = map(reviews, (review) => review.data().rating);

      const media = mean(arrayStars);
      const rastauranteRef = doc(
        db,
        "restaurantes",
        route.params.idRestaurante
      );

      await updateDoc(rastauranteRef, {
        ratingMedia: media,
      });

      navigation.goBack();
    });
  };

  return (
    <View style={styles.content}>
      <View>
        <View style={styles.ratingContent}>
          <AirbnbRating
            count={5}
            reviews={[
              "Pesimo",
              "Deficiente",
              "Normal",
              "Muy bueno",
              "Excelente",
            ]}
            defaultRating={formik.values.rating}
            size={25}
            onFinishRating={(rating) => formik.setFieldValue("rating", rating)}
          />
        </View>
        <View>
          <Input
            placeholder="Titulo"
            onChangeText={(text) => formik.setFieldValue("title", text)}
            errorMessage={formik.errors.title}
          />
          <Input
            placeholder="Comentario"
            multiline
            inputContainerStyle={styles.comment}
            onChangeText={(text) => formik.setFieldValue("comment", text)}
            errorMessage={formik.errors.comment}
          />
        </View>
      </View>
      <Button
        title="Enviar review"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
