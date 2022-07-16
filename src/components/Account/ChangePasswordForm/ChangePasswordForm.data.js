import * as Yup from "yup";

export function initialValues() {
  return {
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };
}

export function validationSchema() {
  return Yup.object({
    password: Yup.string().required("La contraseña es obligatoria"),
    newPassword: Yup.string().required("La contraseña es obligatoria"),
    confirmNewPassword: Yup.string()
      .required("La contraseña es obligatoria")
      .oneOf(
        [Yup.ref("newPassword")],
        "Las nueva contraseñas deben ser iguales"
      ),
  });
}
