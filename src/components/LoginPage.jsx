import React, { useState } from "react";
import { Box } from "@chakra-ui/layout";
import { Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import * as Yup from "yup";
import { loginAPI } from "../API/ServerAPI";

const initialValues = {
  login: "",
  email: "",
  password: "",
};

let validationSchema = Yup.object({
  login: Yup.string().required(),
  email: Yup.string().email(),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
      "Must Contain One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

const alreadyInUseEmail = [];
const alreadyInUseLogin = [];

const LoginPage = () => {
  const [schema, setSchema] = useState(validationSchema);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setFieldError }) => {
        await loginAPI.validate(values).then((response) => {
          response.isValid ? console.log("good") : console.log("bad");
          console.log(response);
          response.errors.forEach((item) => {
            setFieldError(item.field, item.errorType);
            if (item.field === "email") alreadyInUseEmail.push(item.value);
            if (item.field === "login") alreadyInUseLogin.push(item.value);
          });
        });
      }}
      validationSchema={schema}
      validate={(values) => {
        let errors = {};
        if (alreadyInUseEmail.includes(values.email)) {
          errors.email = "Email address already in use";
        }
        if (alreadyInUseLogin.includes(values.login)) {
          errors.login = "Login already in use";
        }
        return errors;
      }}
    >
      {({ handleSubmit }) => (
        <Box w={400} ml="auto" mr="auto" as="form" onSubmit={handleSubmit}>
          <InputControl
            name="login"
            label="Login"
            inputProps={{ placeholder: "Login" }}
            m={4}
          />
          <InputControl
            name="email"
            label="email"
            inputProps={{ placeholder: "mail@mail.com", type: "email" }}
            m={4}
          />
          <InputControl
            name="password"
            label="Password"
            inputProps={{ placeholder: "Enter uou password", type: "password" }}
            m={4}
          />
          <SubmitButton m={4}>Submit</SubmitButton>
        </Box>
      )}
    </Formik>
  );
};

export default LoginPage;
