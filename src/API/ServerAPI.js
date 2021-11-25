import * as Yup from "yup";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const users = [
  {
    key: 1,
    login: "Nik",
    email: "abc@abc.com",
    password: "624frH%615",
  },
  {
    key: 2,
    login: "Ben",
    email: "qwe@qwe.com",
    password: "615313RRt43%&g2",
  },
];

const serverValidationSchema = Yup.object({
  login: Yup.string()
    .required()
    .notOneOf([users.map((item) => item.login)], "Login already in use"),
  email: Yup.string()
    .email()
    .notOneOf(
      [users.map((item) => item.email)],
      "Email address already in use"
    ),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
      "Must Contain One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

export const loginAPI = {
  async validate(values) {
    await sleep(1000);
    console.log(values);
    return serverValidationSchema
      .validate(values, { abortEarly: false })
      .then((values) => {
        console.log("good_s");
        return { isValid: true, values: values };
      })
      .catch(function (err) {
        return {
          isValid: false,
          errors: err.inner.map((item) => {
            return {
              field: item.path,
              errorType: item.errors,
              value: item.value,
            };
          }),
        };
      });
  },
};
