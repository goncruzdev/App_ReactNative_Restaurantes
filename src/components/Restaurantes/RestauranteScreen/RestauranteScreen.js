import React, { useState, useEffect } from "react";
import { ScrollView, Dimensions } from "react-native";
import { styles } from "./RestauranteScreen.styles";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../utils";
import { Carousel, Loading } from "../../Shared";
import { Header, Info } from "../../../components/Restaurante";

export function RestauranteScreen({ route }) {
  const [restaurante, setrestaurante] = useState(null);
  const { width } = Dimensions.get("window");

  useEffect(() => {
    setrestaurante(null);
    onSnapshot(doc(db, "restaurantes", route.params.id), (doc) => {
      setrestaurante(doc.data());
    });
  }, [route.params.id]);

  if (!restaurante) return <Loading show text="Cargando Restaurante" />;
  return (
    <ScrollView style={styles.content}>
      <Carousel images={restaurante.images} height={250} width={width} />
      <Header restaurante={restaurante} />
      <Info restaurante={restaurante} />
    </ScrollView>
  );
}
