import { View } from "react-native";
import React from "react";
import { styles } from "./UserNotLogged.styles";
import { Text, Icon, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export function UserNotLogged() {
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate(screen.account.tab, { screen: screen.account.login });
  };
  return (
    <View style={styles.content}>
      <Icon type="material-community" name="alert-outline" size={80} />
      <Text style={styles.info}>Necesitas loguearte para ver esta seccion</Text>
      <Button
        title="Ir a Login"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={goToLogin}
      />
    </View>
  );
}
