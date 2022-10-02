import React from "react";
import { View, Image, StyleSheet } from "react-native";
import theme from "../theme";
import RepositoryStats from "./RepositoryStats";

import Text from "./Text";
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 10,
  },
  stats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: "white",
    padding: 4,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    borderColor: "black",
  },
});

const RepositoryItem = ({ item }) => {
  const { fullName, description, language } = item;
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: item.ownerAvatarUrl,
            }}
          />
          <View style={{ justifyContent: "space-evenly" }}>
            <Text fontWeight="bold">{fullName}</Text>
            <Text>{description}</Text>
            <Text fontWeight="bold" style={styles.language}>
              {language}
            </Text>
          </View>
        </View>
      </View>
      <RepositoryStats item={item} />
    </View>
  );
};

export default RepositoryItem;
