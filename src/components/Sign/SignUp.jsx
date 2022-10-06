import FormikTextInput from "../FormikTextInput";
import { Formik } from "formik";
import { View, Pressable, StyleSheet } from "react-native";
import theme from "../../theme";
import Text from "../Text";
import { useNavigate } from "react-router-native";
import * as yup from "yup";
import useSignIn from "../../hooks/useSignIn";
import { CREATE_USER } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import useSignUp from "../../hooks/useSignUp";
const initialValues = {
  username: "",
  password: "",
  passwordConfirm: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required").min(1).max(30),
  password: yup.string().required("Password is required").min(5).max(50),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Both passwords must match")
    .required("Password confirm is required"),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
      />
      <FormikTextInput
        name="passwordConfirm"
        placeholder="Password confirmation"
        secureTextEntry={true}
      />
      <Pressable onPress={onSubmit}>
        <Text fontWeight="bold" style={styles.button}>
          Sign Up
        </Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const newUser = await signUp({
        username,
        password,
      });
      await signIn({ username: newUser.username, password });
      navigate("/", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  form: {
    backgroundColor: "white",
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: "white",
    textAlign: "center",
    padding: 15,
    margin: 10,
    borderRadius: 5,
  },
});
