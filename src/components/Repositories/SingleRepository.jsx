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
  console.log(id);
  const { repository, errorRepository, loadingRepository } = useRepository(id);
  const { reviews, errorReviews, loadingReviews } = useReviews(id);

  if (errorRepository || errorReviews) {
    console.error(errorRepository, errorReviews);
  }

  if (loadingRepository || loadingReviews) {
    return <Loading />;
  }

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
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export default SingleRepository;
