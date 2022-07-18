import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { screen } from "../../../utils";
import { styles } from "./RestaurantesScreen.styles";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function RestaurantesScreen(props) {
  const { navigation } = props;
  const [currentUser, setcurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setcurrentUser(user);
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
      <Text>restaurantes</Text>
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
