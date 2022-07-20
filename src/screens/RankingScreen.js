import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../utils";
import { map } from "lodash";
import { RestaurantesRanking } from "../components/Restaurantes";

export function RankingScreen() {
  const [restaurantes, setRestaurantes] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "restaurantes"),
      orderBy("ratingMedia", "desc"),
      limit(10)
    );

    onSnapshot(q, (snapshot) => {
      setRestaurantes(snapshot.docs);
    });
  }, []);

  return (
    <ScrollView>
      {map(restaurantes, (restaurante, index) => (
        <RestaurantesRanking
          key={index}
          index={index}
          restaurante={restaurante.data()}
        />
      ))}
    </ScrollView>
  );
}
