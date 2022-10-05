import { StyleSheet, View, Image, Button } from "react-native";
import theme from "../../theme";
import Text from "../Text";
import RepositoryStats from "./RepositoryStats";
import * as Linking from "expo-linking";

const RepositoryInfo = ({ repository, url }) => {
  const { description, language, ownerAvatarUrl, fullName } = repository;

  const openInGithub = () => {
    console.log("url", url);
    console.log("GOING TO GITHUB");
    Linking.openURL(url);
  };

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
      <RepositoryStats item={repository} />
      <Button onPress={openInGithub} title="Open in GitHub" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
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

export default RepositoryInfo;
