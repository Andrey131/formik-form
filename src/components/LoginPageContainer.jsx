import React, { useState } from "react";
import { Box } from "@chakra-ui/layout";
import { Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import * as Yup from "yup";
import { loginAPI } from "../API/ServerAPI";
import LoginPage from "./LoginPage";

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

const initialValues = {
  login: "",
  email: "",
  password: "",
};

const validationFunction = (values) => {
  let errors = {};
  if (alreadyInUse[1].includes(values.email)) {
    errors.email = "Email address already in use";
  }
  if (alreadyInUse[0].includes(values.login)) {
    errors.login = "Login already in use";
  }
  return errors;
};

const alreadyInUse = [[], []];

const LoginPageContainer = () => {
  const submit = (response) => {
    if (!response.isValid) {
      response.errors.forEach((item) => {
        if (item.field === "email") alreadyInUse[1].push(item.value);
        if (item.field === "login") alreadyInUse[0].push(item.value);
      });
      return response;
    }
  };

  return (
    <LoginPage
      validationSchema={validationSchema}
      initialValues={initialValues}
      submit={submit}
      validationFunction={validationFunction}
    />
  );
};

export default LoginPageContainer;
