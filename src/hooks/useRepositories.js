import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (selectedFilter = "CREATED_AT", searchQuery) => {
  if (selectedFilter === "ASC") {
    const { data, error, loading } = useQuery(GET_REPOSITORIES, {
      fetchPolicy: "cache-and-network",
      variables: {
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC",
        searchKeyword: searchQuery,
      },
    });

    if (data) {
      return { repositories: data.repositories, loading, error };
    } else {
      return {};
    }
  } else {
    const { data, error, loading } = useQuery(GET_REPOSITORIES, {
      fetchPolicy: "cache-and-network",
      variables: {
        orderBy: selectedFilter,
        orderDirection: "DESC",
        searchKeyword: searchQuery,
      },
    });

    console.log("DATA", data);
    console.log("LOADING", loading);
    if (data) {
      return { repositories: data.repositories, loading, error };
    } else {
      return {};
    }
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
