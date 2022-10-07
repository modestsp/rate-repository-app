import { GET_REVIEWS } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useReviews = (id, first) => {
  const { data, error, loading, fetchMore, ...result } = useQuery(GET_REVIEWS, {
    fetchPolicy: "cache-and-network",
    variables: {
      repositoryId: id,
      first: first,
    },
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        repositoryId: id,
        first,
      },
    });
  };

  return {
    reviews: data?.repository.reviews.edges,
    fetchMore: handleFetchMore,
    errorReviews: error,
    loadingReviews: loading,
    ...result,
  };
};

export default useReviews;
