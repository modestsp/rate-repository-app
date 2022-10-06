import * as React from "react";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

const SearchInput = ({ searchQuery, onChangeSearch }) => {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={styles.searchInput}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    margin: 10,
    marginBottom: 0,
  },
});

export default SearchInput;
