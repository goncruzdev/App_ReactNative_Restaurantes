import React, { useState, useEffect } from "react";
import { Text, ScrollView } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../utils";
import {
  UserNotLogged,
  NotFoundRestaurante,
  RestaurantesFavorites,
} from "../components/Favorites";
import { Loading } from "../components/Shared";
import { size } from "lodash";

export function FavoritesScreen() {
  const [hasLogged, setHasLogged] = useState(false);
  const [restaurantes, setRestaurantes] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  useEffect(() => {
    if (hasLogged) {
      const q = query(
        collection(db, "favorites"),
        where("idUser", "==", auth.currentUser.uid)
      );

      onSnapshot(q, async (snapshot) => {
        let restaurantArray = [];
        for await (const item of snapshot.docs) {
          const data = item.data();
          const docRef = doc(db, "restaurantes", data.idRestaurante);
          const docSnap = await getDoc(docRef);
          const newData = docSnap.data();
          newData.idFavorite = data.id;

          restaurantArray.push(newData);
        }

        setRestaurantes(restaurantArray);
      });
    }
  }, [hasLogged]);

  if (!hasLogged) return <UserNotLogged />;

  if (!restaurantes) return <Loading show text="Cargando" />;

  if (size(restaurantes) === 0) return <NotFoundRestaurante />;

  return (
    <ScrollView>
      {restaurantes.map((restaurante) => (
        <RestaurantesFavorites key={restaurante.id} restaurante={restaurante} />
      ))}
    </ScrollView>
  );
}
