import React from "react";
import { View, Image, StyleSheet, Button } from "react-native";
import theme from "../theme";
import RepositoryStats from "./RepositoryStats";
import { useParams } from "react-router-native";
import Text from "./Text";
import useRepository from "../hooks/useRepository";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import * as Linking from "expo-linking";

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
  const { id } = useParams();
  console.log("id en item", id);
  let result = {};

  if (id) {
    result = useQuery(GET_REPOSITORY, {
      variables: {
        repositoryId: id,
      },
    });
    console.log("data", result);
  }
  if (result.loading) {
    return (
      <View>
        <Text>LOADING!</Text>
      </View>
    );
  }

  const openInGithub = () => {
    const url = result.data.repository.url;
    console.log("url");
    console.log("GOING TO GITHUB");
    Linking.openURL(url);
  };

  const { fullName, description, language, ownerAvatarUrl } =
    item || result.data.repository;

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: ownerAvatarUrl,
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
      <RepositoryStats item={item || result.data.repository} />
      {id ? <Button onPress={openInGithub} title="Open in Github" /> : null}
    </View>
  );
};

export default RepositoryItem;
