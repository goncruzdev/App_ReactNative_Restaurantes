import { View, Text } from "react-native";
import React from "react";
import { getAuth } from "firebase/auth";
import { Avatar } from "@rneui/themed";
import { styles } from "./InfoUser.styles";

export function InfoUser() {
  const { uid, photoURL, displayName, email } = getAuth().currentUser;
  const changeAvatar = () => {
    console.log("cambio avater");
  };

  return (
    <View style={styles.content}>
      <Avatar
        size="large"
        rounded
        containerStyle={styles.avatar}
        icon={{ type: "material", name: "person" }}
        source={{ uri: photoURL }}
      >
        <Avatar.Accessory size={24} onPress={changeAvatar} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>{displayName || "Nombre"}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}
