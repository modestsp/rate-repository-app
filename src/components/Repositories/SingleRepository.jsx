import { useParams } from "react-router-native";
import { View, FlatList, StyleSheet } from "react-native";
import RepositoryInfo from "./RepositoryInfo";
import ReviewItem from "./ReviewItem";
import useRepository from "../../hooks/useRepository";
import useReviews from "../../hooks/useReviews";
import Loading from "../Loading";

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, errorRepository, loadingRepository } = useRepository(id);
  const first = 5;
  const { reviews, errorReviews, loadingReviews, fetchMore } = useReviews(
    id,
    first
  );

  if (errorRepository || errorReviews) {
    console.error(errorRepository, errorReviews);
  }

  if (loadingRepository || loadingReviews) {
    return <Loading />;
  }

  const onEndReach = () => {
    console.log("You have reached the end of the list");
    fetchMore();
  };

  const url = repository.url;
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ node }) => node.id}
      ListHeaderComponent={() => (
        <RepositoryInfo repository={repository} url={url} />
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export default SingleRepository;
