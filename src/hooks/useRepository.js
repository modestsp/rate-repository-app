import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: {
      repositoryId: id,
    },
  });
  if (data) {
    return {
      repository: data.repository,
      errorRepository: error,
      loadingRepository: loading,
    };
  } else {
    return { loadingRepository: true };
  }
};

export default useRepository;
