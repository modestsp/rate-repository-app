import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem.jsx";
import useRepositories from "../hooks/useRepositories.js";
import Text from "./Text.jsx";

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

const renderItem = ({ item }) => {
  return <RepositoryItem item={item} />;
};

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();

  if (error) {
    console.error(error);
  }
  if (loading) {
    return (
      <View>
        <Text style={styles.loading}>LOADING!</Text>
      </View>
    );
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
