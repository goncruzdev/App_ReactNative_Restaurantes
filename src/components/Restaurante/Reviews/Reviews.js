import React, { useState, useEffect } from "react";
import { View } from "react-native";
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../utils";
import { Loading } from "../../Shared";
import { Text, AirbnbRating, ListItem, Avatar } from "@rneui/themed";
import { map } from "lodash";
import { styles } from "./Reviews.styles";
import { DateTime } from "luxon";
import "intl";
import "intl/locale-data/jsonp/es";

export function Reviews({ idRestaurante }) {
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    const q = query(
      collection(db, "reviews"),
      where("idRestaurante", "==", idRestaurante),
      orderBy("createAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      setReviews(snapshot.docs);
    });
  }, []);

  if (!reviews) return <Loading show text="Cargando..." />;

  return (
    <View style={styles.content}>
      {map(reviews, (review) => {
        const data = review.data();
        const createReview = new Date(data.createAt.seconds * 1000);
        return (
          <ListItem key={data.id} bottomDivider containerStyle={styles.review}>
            <Avatar source={{ uri: data.avatar }} size={50} rounded />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{data.title}</ListItem.Title>
              <View style={styles.subtitle}>
                <Text style={styles.comment}>{data.comment}</Text>
                <View style={styles.contentRatingDate}>
                  <AirbnbRating
                    defaultRating={data.rating}
                    showRating={false}
                    size={15}
                    isDisabled
                    starContainerStyle={styles.starContainer}
                  />
                  <Text style={styles.date}>
                    {DateTime.fromISO(createReview.toISOString()).toFormat(
                      "yyyy/LL/dd - hh:mm"
                    )}
                  </Text>
                </View>
              </View>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </View>
  );
}
