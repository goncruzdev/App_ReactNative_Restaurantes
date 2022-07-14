import React from "react";
import { View, ScrollView } from "react-native";
import { styles } from "./UserGuestScreen.styles";
import { Text, Button, Image } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export function UserGuestScreen() {
  const navigation = useNavigation();
  const goToLogin = () => {
    navigation.navigate(screen.account.login);
  };

  return (
    <ScrollView centerContent={true} style={styles.content}>
      <Image
        source={require("../../../../assets/img/user-guest.jpg")}
        style={styles.image}
      />
      <Text style={styles.title}>consultar tu perfil</Text>
      <Text style={styles.description}>
        sdczxcxcvsdfna,msdnqnmbdkajsbdasbdjabsdjqawjedbawudgbscajscnzxcbasjbddasdnnwlkeqnwkenqwewqwejbczm,xc
        zm,xcnzm,xc zm,c zmxcbnmsbndjlabnsdjbnasldj uwdhquwhd
      </Text>
      <Button
        title="Ver tu perfil"
        onPress={goToLogin}
        buttonStyle={styles.btnStyle}
      />
    </ScrollView>
  );
}
