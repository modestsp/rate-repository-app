import Text from "./Text";
import { View } from "react-native";
import { numFormatter } from "../utils";

const RepositoryStats = ({ item }) => {
  const { stargazersCount, forksCount, ratingAverage, reviewCount } = item;
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      <View>
        <Text fontWeight="bold">{numFormatter(stargazersCount)}</Text>
        <Text fontWeight="normal">Stars</Text>
      </View>
      <View>
        <Text fontWeight="bold">{numFormatter(forksCount)}</Text>
        <Text fontWeight="normal">Forks</Text>
      </View>
      <View>
        <Text fontWeight="bold">{reviewCount}</Text>
        <Text fontWeight="normal">Reviews</Text>
      </View>
      <View>
        <Text fontWeight="bold">{ratingAverage}</Text>
        <Text fontWeight="normal">Rating</Text>
      </View>
    </View>
  );
};

export default RepositoryStats;
