import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem.jsx";
import useRepositories from "../../hooks/useRepositories.js";
import { useNavigate } from "react-router-native";
import Loading from "../Loading.jsx";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  loading: {
    fontSize: 40,
    color: "blue",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();
  const navigate = useNavigate();

  const handlePress = (item) => {
    navigate(`/${item.id}`, { replace: true });
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => handlePress(item)}>
        <RepositoryItem item={item} />
      </Pressable>
    );
  };
  if (error) {
    console.error(error);
  }
  if (loading) {
    return <Loading />;
  }
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
