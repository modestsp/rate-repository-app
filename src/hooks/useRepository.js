import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const result = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: {
      repositoryId: id,
    },
  });

  console.log("result", result);
  if (result.data) {
    return result;
  } else {
    return {};
  }
};

export default useRepository;
