import React, { useState } from "react";
import { View } from "react-native";
import { InfoUser } from "../../../components/Account";
import { styles } from "./UserLogged.styles";
import { Button } from "@rneui/themed";
import { getAuth, signOut } from "firebase/auth";
import { LoadingModal } from "../../../components/Shared/LoadingModal";

export function UserLoggedScreen() {
  const [loading, setloading] = useState(false);
  const [loadingText, setloadingText] = useState("");

  const logOut = async () => {
    const auth = getAuth();
    await signOut(auth);
  };
  return (
    <View style={styles.content}>
      <InfoUser setloading={setloading} setloadingText={setloadingText} />
      <Button
        title="Cerrar Sesion"
        buttonStyle={styles.btnStyles}
        titleStyle={styles.btnTextStyle}
        onPress={logOut}
      />
      <LoadingModal show={loading} text={loadingText} />
    </View>
  );
}
