import { View, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./RestaurantesRanking.styles";
import { Text, Image, Icon } from "@rneui/themed";
import { Rating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export function RestaurantesRanking({ restaurante, index }) {
  const navigation = useNavigation();

  const goToRestaurante = () => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.restaurant,
      params: { id: restaurante.id },
    });
  };

  const renderMedal = () => {
    if (index > 2) return null;
    let color = "";
    if (index === 0) color = "#FFD700";
    if (index === 1) color = "#BEBEBE";
    if (index === 2) color = "#CD7F32";

    return (
      <Icon
        type="material-community"
        name="medal-outline"
        color={color}
        containerStyle={styles.medal}
      />
    );
  };

  return (
    <TouchableOpacity onPress={goToRestaurante}>
      <View style={styles.content}>
        <Image source={{ uri: restaurante.images[0] }} style={styles.image} />
        <View style={styles.infoContent}>
          <View style={styles.nameContent}>
            {renderMedal()}
            <Text style={styles.name}>{restaurante.name}</Text>
          </View>
          <Rating
            imageSize={15}
            readonly
            startingValue={restaurante.ratingMedia}
          />
        </View>
        <Text style={styles.description}>{restaurante.description}</Text>
      </View>
    </TouchableOpacity>
  );
}
