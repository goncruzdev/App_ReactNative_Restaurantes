import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { styles } from "./BtnReviewForm.styles";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Text, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { db, screen } from "../../../utils";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { size } from "lodash";

export function BtnReviewForm({ idRestaurante }) {
  const [hasLogged, setHasLogged] = useState(false);
  const [hasReview, sethasReview] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  useEffect(() => {
    if (hasLogged) {
      const q = query(
        collection(db, "reviews"),
        where("idRestaurante", "==", idRestaurante),
        where("idUser", "==", auth.currentUser.uid)
      );

      onSnapshot(q, (snapshot) => {
        if (size(snapshot.docs) > 0) sethasReview(true);
      });
    }
  }, [hasLogged]);

  const goToLogin = () => {
    navigation.navigate(screen.account.login);
  };

  const goToReviewRestaurante = () => {
    navigation.navigate(screen.restaurant.addReviewRestaurante, {
      idRestaurante,
    });
  };

  if (hasLogged && hasReview) {
    return (
      <View style={styles.content}>
        <Text style={styles.textSendReview}>
          Ya has enviado un review en este restaurante
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.content}>
      {hasLogged ? (
        <Button
          title="Escribe una opinion"
          icon={{
            type: "material-community",
            name: "square-edit-outline",
            color: "#00a680",
          }}
          buttonStyle={styles.button}
          titleStyle={styles.btnText}
          onPress={goToReviewRestaurante}
        />
      ) : (
        <Text style={styles.text}>
          Para escribir un comentario es necesario estar logueado{" "}
          <Text style={styles.textClick} onPress={goToLogin}>
            {" "}
            pulsa AQUI para iniciar sesion
          </Text>
        </Text>
      )}
    </View>
  );
}
