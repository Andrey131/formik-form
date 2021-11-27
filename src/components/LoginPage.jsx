import React from "react";
import { Box } from "@chakra-ui/layout";
import { Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import { loginAPI } from "../API/ServerAPI";

const LoginPage = (props) => {
  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={async (values, { setFieldError }) => {
        await loginAPI.validate(values).then((response) => {
          props.submit(response).errors.forEach((item) => {
            setFieldError(item.field, item.errorType);
          });
        });
      }}
      validationSchema={props.validationSchema}
      validate={(values) => {
        return props.validationFunction(values);
      }}
    >
      {({ handleSubmit, isValid }) => (
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
          <SubmitButton m={4} disabled={!isValid}>
            Submit
          </SubmitButton>
        </Box>
      )}
    </Formik>
  );
};

export default LoginPage;
