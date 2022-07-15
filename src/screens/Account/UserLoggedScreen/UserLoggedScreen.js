import React from "react";
import { View } from "react-native";
import { InfoUser } from "../../../components/Account";
import { styles } from "./UserLogged.styles";
import { Button } from "@rneui/themed";
import { getAuth, signOut } from "firebase/auth";

export function UserLoggedScreen() {
  const logOut = async () => {
    const auth = getAuth();
    await signOut(auth);
  };
  return (
    <View style={styles.content}>
      <InfoUser />
      <Button
        title="Cerrar Sesion"
        buttonStyle={styles.btnStyles}
        titleStyle={styles.btnTextStyle}
        onPress={logOut}
      />
    </View>
  );
}
