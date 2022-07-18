import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Modal } from "../../../Shared/Modal";
import * as Location from "expo-location";
import Toast from "../../../Shared";
import MapView from "react-native-maps";
import { styles } from "./MapForm.styles";
import { Text, Button } from "@rneui/themed";

export function MapForm(props) {
  const { show, close, formik } = props;
  const [location, setlocation] = useState({
    latitude: 0.001,
    longitude: 0.001,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Toast.show({
          type: "info",
          position: "bottom",
          text1: "No tiene permiso para usa la ubicacion",
        });

        return;
      }

      const locationTemp = await Location.getCurrentPositionAsync({});

      setlocation({
        latitude: locationTemp.coords.latitude,
        longitude: locationTemp.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    })();
  }, []);

  const saveLocation = () => {
    formik.setFieldValue("location", location);
    close();
  };
  return (
    <Modal show={show} close={close}>
      <MapView
        initialRegion={location}
        showUserLocation={true}
        style={styles.mapStyles}
        onRegionChange={(locationTemp) => setlocation(locationTemp)}
      >
        <MapView.Marker draggable coordinate={location} />
      </MapView>

      <View style={styles.mapActions}>
        <Button
          title="Guardar"
          containerStyle={styles.btnMapContainerSave}
          buttonStyle={styles.btnMapSave}
          onPress={saveLocation}
        />
        <Button
          title="Cerrar"
          containerStyle={styles.btnMapContainerCancel}
          buttonStyle={styles.btnMapCancel}
          onPress={close}
        />
      </View>
    </Modal>
  );
}
