import Text from "../Text";
import FormikTextInput from "../FormikTextInput";
import useReview from "../../hooks/useReview";
import { View, Pressable, StyleSheet } from "react-native";
import theme from "../../theme";
import * as yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-native";

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: 0,
  review: "",
};
const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner's username is required"),
  repositoryName: yup.string().required("Repository's name is required"),
  rating: yup
    .number("Rating must be a valid number")
    .positive("Rating must be > 0 and <= 100")
    .min(0)
    .max(100)
    .required(),
  review: yup.string().optional(),
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" multiline={true} />
      <Pressable onPress={onSubmit}>
        <Text fontWeight="bold" style={styles.button}>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export const CreateReview = () => {
  const [newReview, result] = useReview();
  const navigate = useNavigate();

  if (result.error) {
    console.log("error in CreateReview", result);
  }
  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;

    try {
      const review = await newReview({
        repositoryName,
        ownerName,
        rating: Number(rating),
        text,
      });
      if (review) {
        console.log("created review", review);
        navigate(`/${review.createReview.repositoryId}`, { replace: true });
      }
    } catch (e) {
      console.log("ERROR ****************", e);
      console.error(e);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
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
