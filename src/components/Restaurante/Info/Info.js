import { View } from "react-native";
import React from "react";
import { styles } from "./Info.styles";
import { Text, ListItem, Icon } from "@rneui/themed";
import { map } from "lodash";
import { Map } from "../../Shared";

export function Info({ restaurante }) {
  const listInfo = [
    {
      text: restaurante.address,
      iconName: "place",
      iconType: "material-comunity",
    },
    {
      text: restaurante.phone,
      iconName: "phone",
      iconType: "material-comunity",
    },
    {
      text: restaurante.email,
      iconName: "email",
      iconType: "material-comunity",
    },
  ];

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Informacion Sobre el Restaurante</Text>
      <Map location={restaurante.location} name={restaurante.name} />
      {map(listInfo, (item, index) => (
        <ListItem key={index} bottomDivider>
          <Icon type={item.iconType} name={item.iconName} color="#00a680" />
          <ListItem.Content>
            <ListItem.Title>{item.text}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
}
