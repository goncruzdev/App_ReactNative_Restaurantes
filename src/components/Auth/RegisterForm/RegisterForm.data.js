import * as Yup from "yup";
export function initialValues() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("El formato de email es incorrecto")
      .required("El mail es obligatorio"),
    password: Yup.string().required("La contraseña es obligatioria"),
    repeatPassword: Yup.string()
      .required("La contraseña es obligatioria")
      .oneOf([Yup.ref("password")], "Las contraseñas deben ser iguales"),
  });
}
