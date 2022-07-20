import React from "react";
import { View, TouchableOpacity } from "react-native";
import { styles } from "./RestaurantesFavorites.styles";
import { Text, Icon, Image } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { db, screen } from "../../../utils";
import { doc, deleteDoc } from "firebase/firestore";

export function RestaurantesFavorites({ restaurante }) {
  const navigation = useNavigation();

  const goToRestaurante = () => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.restaurant,
      params: { id: restaurante.id },
    });
  };

  const onRemoveFavorite = async () => {
    try {
      await deleteDoc(doc(db, "favorites", restaurante.idFavorite));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={goToRestaurante}>
      <View style={styles.content}>
        <Image source={{ uri: restaurante.images[0] }} style={styles.image} />
        <View style={styles.infoContent}>
          <Text style={styles.name}>{restaurante.name}</Text>
          <Icon
            type="material-community"
            name="heart"
            color="#f00"
            size={35}
            containerStyle={styles.iconContainer}
            onPress={onRemoveFavorite}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
