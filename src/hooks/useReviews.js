import { GET_REVIEWS } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useReviews = (id) => {
  const { data, error, loading } = useQuery(GET_REVIEWS, {
    variables: {
      repositoryId: id,
    },
    fetchPolicy: "cache-and-network",
  });

  if (data) {
    return {
      reviews: data.repository.reviews.edges,
      errorReviews: error,
      loadingReviews: loading,
    };
  } else {
    return {};
  }
};

export default useReviews;
