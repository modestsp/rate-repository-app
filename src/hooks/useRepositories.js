import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (first, selectedFilter = "CREATED_AT", searchQuery) => {
  if (selectedFilter === "ASC") {
    const { data, error, fetchMore, loading, ...result } = useQuery(
      GET_REPOSITORIES,
      {
        fetchPolicy: "cache-and-network",
        variables: {
          orderBy: "RATING_AVERAGE",
          first,
          orderDirection: "ASC",
          searchKeyword: searchQuery,
        },
      }
    );
    const handleFetchMore = () => {
      const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
      console.log("CANFETCHMORE", canFetchMore);
      if (!canFetchMore) {
        return;
      }
      fetchMore({
        variables: {
          after: data.repositories.pageInfo.endCursor,
          orderBy: "RATING_AVERAGE",
          orderDirection: "ASC",
          searchKeyword: searchQuery,
          first,
        },
      });
    };

    return {
      repositories: data?.repositories,
      fetchMore: handleFetchMore,
      loading,
      ...result,
    };
  } else {
    const { data, error, loading, fetchMore, ...result } = useQuery(
      GET_REPOSITORIES,
      {
        fetchPolicy: "cache-and-network",
        variables: {
          orderBy: selectedFilter,
          orderDirection: "DESC",
          searchKeyword: searchQuery,
          first,
        },
      }
    );

    const handleFetchMore = () => {
      const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

      if (!canFetchMore) {
        return;
      }

      fetchMore({
        variables: {
          after: data.repositories.pageInfo.endCursor,
          orderBy: selectedFilter,
          orderDirection: "DESC",
          searchKeyword: searchQuery,
          first,
        },
      });
    };

    return {
      repositories: data?.repositories,
      fetchMore: handleFetchMore,
      loading,
      ...result,
    };
  }
};

export default useRepositories;

// ************** Fetch Without GraphQL *********************
// const useRepositories = () => {
//   const [repositories, setRepositories] = useState();
//   const [loading, setLoading] = useState(false);

//   const fetchRepositories = async () => {
//     setLoading(true);

//     const response = await fetch("http://192.168.0.101:5000/api/repositories");
//     const json = await response.json();

//     console.log(json);
//     setLoading(false);
//     setRepositories(json);
//   };

//   useEffect(() => {
//     fetchRepositories();
//   }, []);

//   return { repositories, loading, refetch: fetchRepositories };
// };

// export default useRepositories;
