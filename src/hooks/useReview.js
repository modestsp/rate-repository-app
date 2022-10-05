import { CREATE_REVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const useReview = () => {
  const [createReview, result] = useMutation(CREATE_REVIEW);

  const newReview = async ({ repositoryName, ownerName, rating, text }) => {
    const { data } = await createReview({
      variables: {
        review: { repositoryName, ownerName, rating, text },
      },
    });

    return data;
  };

  return [newReview, result];
};

export default useReview;
