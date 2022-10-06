import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem.jsx";
import useRepositories from "../../hooks/useRepositories.js";
import { useNavigate } from "react-router-native";
import Loading from "../Loading.jsx";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { useRef } from "react";

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [selectedFilter, setSelectedFilter] = useState();
  const { repositories, loading, error } = useRepositories(selectedFilter);

  const navigate = useNavigate();

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }
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
    <View>
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
