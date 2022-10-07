import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../../graphql/queries";
import { DELETE_REVIEW } from "../../graphql/mutations";
import { FlatList } from "react-native";
import { View, StyleSheet, Button, Alert } from "react-native";
import ReviewItem from "./ReviewItem";
import Loading from "../Loading";
import * as Linking from "expo-linking";
const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
    variables: {
      includeReviews: true,
    },
  });

  const [handleDeleteReview] = useMutation(DELETE_REVIEW);

  const openInGithub = (url) => {
    console.log("url", url);
    console.log("GOING TO GITHUB");
    Linking.openURL(url);
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            handleDeleteReview(id);
            refetch();
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => {
    const reviewId = item.node.id;
    const url = item.node.repository.url;

    return (
      <View style={styles.contaiter}>
        <ReviewItem review={item} />
        <View style={styles.buttons}>
          <Button onPress={() => openInGithub(url)} title="View Repository" />
          <Button
            onPress={() => handleDelete(reviewId)}
            color="red"
            title="Delete Review"
          />
        </View>
      </View>
    );
  };

  if (loading) {
    return <Loading />;
  }

  const reviews = data.me.reviews.edges;

  return (
    <FlatList
      data={reviews}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ node }) => node.id}
      // onEndReached={onEndReach}
      // onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  contaiter: {
    backgroundColor: "white",
  },
  separator: {
    height: 10,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  button: {
    color: "red",
    backgroundColor: "red",
  },
});

export default MyReviews;
