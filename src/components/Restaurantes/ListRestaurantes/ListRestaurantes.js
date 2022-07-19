import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./ListRestaurantes.styles";
import { Text, Image } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export function ListRestaurantes({ restaurants }) {
  const navigation = useNavigation();

  const goToRestaurante = (restaurante) => {
    navigation.navigate(screen.restaurant.restaurant, { id: restaurante.id });
  };

  return (
    <View>
      <FlatList
        data={restaurants}
        renderItem={(doc) => {
          const restaurante = doc.item.data();

          return (
            <TouchableOpacity onPress={() => goToRestaurante(restaurante)}>
              <View style={styles.content}>
                <Image
                  source={{ uri: restaurante.images[0] }}
                  style={styles.image}
                />
                <View>
                  <Text style={styles.name}>{restaurante.name}</Text>
                  <Text style={styles.info}>{restaurante.address}</Text>
                  <Text style={styles.info}>{restaurante.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
