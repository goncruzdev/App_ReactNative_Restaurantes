import React from "react";
import { View } from "react-native";
import { styles } from "./NotFoundRestaurante.styles";
import { Text, Icon, Button } from "@rneui/themed";

export function NotFoundRestaurante() {
  return (
    <View style={styles.content}>
      <Icon type="material-community" name="alert-outline" size={80} />
      <Text style={styles.text}>No tienes restaurantes Favoritos</Text>
    </View>
  );
}
