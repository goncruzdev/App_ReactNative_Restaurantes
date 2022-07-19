import React from "react";
import { View } from "react-native";
import { styles } from "./Header.styles";
import { Text, Rating } from "@rneui/themed";

export function Header({ restaurante }) {
  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{restaurante.name}</Text>
        <Rating imageSize={20} readonly startingValue={4} />
      </View>
      <Text style={styles.description}>{restaurante.description}</Text>
    </View>
  );
}
