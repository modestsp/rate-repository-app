import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import { View, Pressable, StyleSheet } from "react-native";
import theme from "../theme";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const initialValues = {
  username: "",
  password: "",
};
const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput
        name="password"
        placeholder="Pasword"
        secureTextEntry={true}
      />
      <Pressable onPress={onSubmit}>
        <Text fontWeight="bold" style={styles.button}>
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const token = await signIn({ username, password });

      if (token) {
        navigate("/", { replace: true });
      }
    } catch (e) {
      console.log("ERRORRRR");
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

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

export default SignIn;
