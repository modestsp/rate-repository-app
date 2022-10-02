import { View, StyleSheet, ScrollView, Text } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 15,
    paddingLeft: 10,
    backgroundColor: theme.colors.backGroundPrimaryAppBar,
    flexDirection: "row",
  },
  tabs: {
    margin: 10,
    backgroundColor: "blue",
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  loadingText: {
    fontSize: 40,
  },
});

const AppBar = () => {
  const { data, error, loading } = useQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    console.error(error);
  }
  if (loading) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Loading!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <AppBarTab to="/">Repositories</AppBarTab>
        {data.me ? (
          <AppBarTab to="/sign">Sign Out</AppBarTab>
        ) : (
          <AppBarTab to="/sign">Sign In</AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
