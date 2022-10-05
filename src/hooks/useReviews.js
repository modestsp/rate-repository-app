import { GET_REVIEWS } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useReviews = (id) => {
  const { data, error, loading } = useQuery(GET_REVIEWS, {
    fetchPolicy: "cache-and-network",
    variables: {
      repositoryId: id,
    },
  });

  if (data) {
    return {
      reviews: data.repository.reviews.edges,
      errorReviews: error,
      loadingReviews: loading,
    };
  } else {
    return { loadingReviews: true };
  }
};

export default useReviews;
