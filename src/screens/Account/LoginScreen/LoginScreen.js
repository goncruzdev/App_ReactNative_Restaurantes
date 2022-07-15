import { View, ScrollView } from "react-native";
import React from "react";
import { Text, Image } from "@rneui/themed";
import { styles } from "./LoginScreen.styles";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { LoginForm } from "../../../components/Auth/LoginForm";

export function LoginScreen() {
  const navigation = useNavigation();
  const goToRegister = () => {
    navigation.navigate(screen.account.register);
  };
  return (
    <ScrollView>
      <Image
        source={require("../../../../assets/img/5-tenedores-letras-icono-logo.png")}
        style={styles.image}
      />
      <View style={styles.content}>
        <LoginForm />

        <Text style={styles.textRegister}>
          No tienes cueta?{" "}
          <Text style={styles.btnRegister} onPress={goToRegister}>
            Registrate
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}
