import { View, Text } from "react-native";
import React, { useState } from "react";
import CarouselSnap, { Pagination } from "react-native-snap-carousel";
import { Image } from "@rneui/themed";
import { styles } from "./Carousel.styles";
import { size } from "lodash";

export function Carousel({ images, width, height, hideDots }) {
  const [activeDotIndex, setactiveDotIndex] = useState(0);
  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={{ height, width }} />
  );

  const pagination = () => {
    return (
      <Pagination
        dotsLength={size(images)}
        activeDotIndex={activeDotIndex}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        containerStyle={styles.dotContainer}
        dotStyle={styles.dot}
      />
    );
  };

  return (
    <View style={styles.content}>
      <CarouselSnap
        layout="default"
        data={images}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setactiveDotIndex(index)}
      />
      {!hideDots && pagination()}
    </View>
  );
}
