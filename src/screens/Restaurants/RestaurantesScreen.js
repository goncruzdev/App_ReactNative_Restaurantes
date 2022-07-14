import React from "react";
import { Text, View } from "react-native";
import { Button } from "@rneui/themed";
import { screen } from "../../utils";

export function RestaurantesScreen(props) {
  const { navigation } = props;
  const goToAddRestaurante = () => {
    navigation.navigate(screen.restaurant.addRestaurant);
    // navigation.navigate(screen.account.tab, { screen: screen.account.account }); //para navegar a una stack diferente a la actual(recomendado)
  };

  return (
    <View>
      <Text>restaurantes</Text>

      <Button title="Crear Restaurante" onPress={goToAddRestaurante}></Button>
    </View>
  );
}
