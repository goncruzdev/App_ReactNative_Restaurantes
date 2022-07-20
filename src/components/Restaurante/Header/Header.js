import React from "react";
import { View } from "react-native";
import { styles } from "./Header.styles";
import { Text } from "@rneui/themed";
import { Rating } from "react-native-ratings";

export function Header({ restaurante }) {
  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{restaurante.name}</Text>
        <Rating
          imageSize={20}
          readonly
          startingValue={restaurante.ratingMedia | 0}
        />
      </View>
      <Text style={styles.description}>{restaurante.description}</Text>
    </View>
  );
}
