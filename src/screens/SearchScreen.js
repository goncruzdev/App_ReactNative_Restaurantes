import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SearchBar, ListItem, Avatar, Icon, Text } from "@rneui/themed";
import { Loading } from "../components/Shared";
import {
  collection,
  query,
  startAt,
  endAt,
  limit,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db, screen } from "../utils";
import { size, map } from "lodash";
import { useNavigation } from "@react-navigation/native";

export function SearchScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, "restaurantes"),
        orderBy("name"),
        startAt(searchText),
        endAt(`${searchText}\uf8ff`),
        limit(20)
      );

      const querySnapshot = await getDocs(q);
      setSearchResult(querySnapshot.docs);
    })();
  }, [searchText]);

  const goToRestaurante = (idRestaurante) => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.restaurant,
      params: { id: idRestaurante },
    });
  };

  return (
    <>
      <SearchBar
        placeholder="Buscar Restaurante"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      {!searchResult && <Loading show text="Cargando" />}

      <ScrollView>
        {size(searchResult) === 0 ? (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text>No se han encontrado resultados</Text>
          </View>
        ) : (
          map(searchResult, (item) => {
            const data = item.data();
            return (
              <ListItem
                key={data.id}
                bottomDivider
                onPress={() => goToRestaurante(data.id)}
              >
                <Avatar source={{ uri: data.images[0] }} rounded />
                <ListItem.Content>
                  <ListItem.Title>{data.name}</ListItem.Title>
                </ListItem.Content>
                <Icon type="material-community" name="chevron-right" />
              </ListItem>
            );
          })
        )}
      </ScrollView>
    </>
  );
}
