import { DELETE_REVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const useDeleteReview = () => {
  const [deleteReview, result] = useMutation(DELETE_REVIEW);

  const handleDeleteReview = async (id) => {
    await deleteReview({
      variables: {
        deleteReviewId: id,
      },
    });
  };

  return [handleDeleteReview, result];
};

export default useDeleteReview;
