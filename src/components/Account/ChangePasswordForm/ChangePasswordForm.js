import { View, Text } from "react-native";
import React, { useState } from "react";
import { styles } from "./ChangePasswordForm.styles";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangePasswordForm.data";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

import Toast from "react-native-toast-message";

export function ChangePasswordForm(props) {
  const { onClose } = props;
  const [showPassword, setshowPassword] = useState(false);

  const showHidenPassword = () => setshowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const currentUser = getAuth().currentUser;

        const credentials = EmailAuthProvider.credential(
          currentUser.email,
          formValue.password
        );
        const logged = await reauthenticateWithCredential(
          currentUser,
          credentials
        );
        if (logged) {
          await updatePassword(currentUser, formValue.newPassword);
        }

        onClose();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Ha ocurrido un error intente de nuevo mas tarde",
        });
      }
    },
  });
  return (
    <View style={styles.content}>
      <Input
        placeholder="Contraseña Actual"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-comunity",
          name: showPassword ? "visibility-off" : "visibility",
          color: "#c2c2c2",
          onPress: showHidenPassword,
        }}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Input
        placeholder="Nueva Contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-comunity",
          name: showPassword ? "visibility-off" : "visibility",
          color: "#c2c2c2",
          onPress: showHidenPassword,
        }}
        onChangeText={(text) => formik.setFieldValue("newPassword", text)}
        errorMessage={formik.errors.newPassword}
      />
      <Input
        placeholder="Repite Nueva Contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-comunity",
          name: showPassword ? "visibility-off" : "visibility",
          color: "#c2c2c2",
          onPress: showHidenPassword,
        }}
        onChangeText={(text) =>
          formik.setFieldValue("confirmNewPassword", text)
        }
        errorMessage={formik.errors.confirmNewPassword}
      />
      <Button
        title="Cambiar Contraseña"
        containerStyle={styles.container}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
