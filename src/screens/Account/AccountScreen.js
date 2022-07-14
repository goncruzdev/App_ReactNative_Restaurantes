import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserGuestScreen } from "./UserGuestScreen";
import { UserLoggedScreen } from "./UserLoggedScreen";

export function AccountScreen() {
  const [hasLogged, setHasLogged] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, () => {
      setHasLogged(user ? true : false);
    });
  }, []);

  return hasLogged ? <UserLoggedScreen /> : <UserGuestScreen />;
}
