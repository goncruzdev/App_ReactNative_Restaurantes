import { View, Text } from "react-native";
import React from "react";
import { Image } from "@rneui/themed";
import { styles } from "./ImageRestaurante.styles";

export function ImageRestaurante(props) {
  const { images } = props;
  const principalImage = images[0];
  return (
    <View style={styles.content}>
      <Image
        source={
          principalImage
            ? { uri: principalImage }
            : require("../../../../../assets/img/no-image.png")
        }
        style={styles.image}
      />
    </View>
  );
}
