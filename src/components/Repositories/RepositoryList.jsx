import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem.jsx";
import useRepositories from "../../hooks/useRepositories.js";
import { useNavigate } from "react-router-native";
import Loading from "../Loading.jsx";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useRef } from "react";
import SearchInput from "./SearchInput.jsx";
import { useDebounce } from "use-debounce";
const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [selectedFilter, setSelectedFilter] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebounce(searchQuery, 100);
  const first = 8;
  const { repositories, loading, error, fetchMore } = useRepositories(
    first,
    selectedFilter,
    debouncedSearch
  );

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };
  const navigate = useNavigate();

  const pickerRef = useRef();

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

  const onEndReach = () => {
    console.log("You have reached the end of the list");
    fetchMore();
  };

  return (
    <View>
      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onChangeSearch={onChangeSearch}
      />
      <Picker
        ref={pickerRef}
        selectedValue={selectedFilter}
        onValueChange={(itemValue, itemIndex) => setSelectedFilter(itemValue)}
      >
        <Picker.Item label="Latest repositories" value="CREATED_AT" />
        <Picker.Item
          label="Highest rated repositories"
          value="RATING_AVERAGE"
        />
        <Picker.Item label="Lowest rated repositories" value="ASC" />
      </Picker>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  loading: {
    fontSize: 40,
    color: "blue",
  },
});

export default RepositoryList;
