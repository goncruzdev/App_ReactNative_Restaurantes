import React from "react";
import { View, Text } from "react-native";
import { styles } from "./ChangeDisplayName.styles";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangeDisplayName.data";
import { getAuth, updateProfile } from "firebase/auth";
import Toast from "react-native-toast-message";

export function ChangeDisplayName(props) {
  const { onClose, onReload } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { displayName } = formValue;
        const currentUser = getAuth().currentUser;
        await updateProfile(currentUser, { displayName });

        onReload();
        onClose();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Ocurrio un error intente mas tarde",
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Nombre y Apellido"
        rightIcon={{
          type: "material-comunity",
          name: "account-circle",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("displayName", text)}
        errorMessage={formik.errors.displayName}
      />
      <Button
        title="Cambiar Nombre y Apellido"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
