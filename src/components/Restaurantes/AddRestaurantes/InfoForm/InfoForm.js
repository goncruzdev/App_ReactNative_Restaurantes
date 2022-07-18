import React, { useState } from "react";
import { View } from "react-native";
import { styles } from "./InfoForm.styles";
import { Input } from "@rneui/themed";
import { MapForm } from "../MapForm";

export function InfoForm(props) {
  const { formik } = props;

  const [showMap, setshowMap] = useState(false);

  const openCloseMap = () => setshowMap((prevState) => !prevState);
  return (
    <>
      <View style={styles.content}>
        <Input
          placeholder="Nombre del restaurtante"
          onChangeText={(text) => formik.setFieldValue("name", text)}
          errorMessage={formik.errors.name}
        />
        <Input
          placeholder="Direccion"
          onChangeText={(text) => formik.setFieldValue("address", text)}
          errorMessage={formik.errors.address}
          rightIcon={{
            type: "material-comunity",
            name: "place",
            color: getColorIconMap(formik),
            onPress: openCloseMap,
          }}
        />
        <Input
          placeholder="Telefono"
          onChangeText={(text) => formik.setFieldValue("phone", text)}
          errorMessage={formik.errors.phone}
        />
        <Input
          placeholder="Email"
          onChangeText={(text) => formik.setFieldValue("email", text)}
          errorMessage={formik.errors.email}
        />
        <Input
          placeholder="Descripcion del restaurtante"
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChangeText={(text) => formik.setFieldValue("description", text)}
          errorMessage={formik.errors.description}
        />
      </View>
      <MapForm show={showMap} close={openCloseMap} formik={formik} />
    </>
  );
}

const getColorIconMap = (formik) => {
  if (formik.errors.location) return "#ff0000";
  if (formik.errors.location) return "#00a680";
  return "#c2c2c2";
};
