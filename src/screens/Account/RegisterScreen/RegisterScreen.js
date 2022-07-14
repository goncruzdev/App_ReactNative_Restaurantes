import { View } from "react-native";
import React from "react";
import { styles } from "./RegisterScreen.styles";
import { Text, Button, Image } from "@rneui/themed";
import { RegisterForm } from "../../../components/Auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export function RegisterScreen() {
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../../assets/img/5-tenedores-letras-icono-logo.png")}
        style={styles.image}
      />
      <View style={styles.content}>
        <RegisterForm />
      </View>
    </KeyboardAwareScrollView>
  );
}
