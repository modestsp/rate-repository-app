import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: {
      repositoryId: id,
    },
    fetchPolicy: "cache-and-network",
  });

  if (data) {
    return {
      repository: data.repository,
      errorRepository: error,
      loadingRepository: loading,
    };
  } else {
    return {};
  }
};

export default useRepository;
