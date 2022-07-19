import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { screen, db } from "../../../utils";
import { styles } from "./RestaurantesScreen.styles";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { LoadingModal } from "../../../components/Shared";
import { ListRestaurantes } from "../../../components/Restaurantes/ListRestaurantes/ListRestaurantes";

export function RestaurantesScreen(props) {
  const { navigation } = props;
  const [currentUser, setcurrentUser] = useState(null);
  const [restaurants, setrestaurants] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setcurrentUser(user);
    });
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "restaurantes"),
      orderBy("createAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      setrestaurants(snapshot.docs);
    });
  }, []);

  const goToAddRestaurante = () => {
    navigation.navigate(screen.restaurant.addRestaurant);
    // navigation.navigate(screen.restaurant.tab, {
    //   screen: screen.restaurant.addRestaurant,
    // }); //para navegar a una stack diferente a la actual(recomendado)
  };

  return (
    <View style={styles.content}>
      {!restaurants ? (
        <LoadingModal show text="Cargando..." />
      ) : (
        <ListRestaurantes restaurants={restaurants} />
      )}

      {currentUser && (
        <Icon
          reverse
          type="material-comunity"
          name="add"
          color="#00a680"
          containerStyle={styles.btnContainer}
          onPress={goToAddRestaurante}
        />
      )}
    </View>
  );
}
