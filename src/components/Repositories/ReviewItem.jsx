import { View, StyleSheet } from "react-native";
import { format } from "date-fns";
import theme from "../../theme";
import Text from "../Text";

const ReviewItem = ({ review }) => {
  const { text, rating, createdAt, user } = review.node;
  const { username } = user;

  return (
    <View style={styles.container}>
      <View>
        <Text fontWeight="bold" style={styles.rating}>
          {rating}
        </Text>
      </View>
      <View style={styles.content}>
        <>
          <Text fontWeight="bold">{username}</Text>
          <Text style={styles.date}>
            {format(new Date(createdAt), "MM.dd.yyyy")}
          </Text>
        </>
        <View style={styles.description}>
          <Text>{text}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    display: "flex",
    flexDirection: "row",
  },
  rating: {
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
    borderWidth: 2,
    width: 50,
    height: 50,
    textAlignVertical: "center",
    textAlign: "center",
    borderRadius: 25,
    padding: 5,
    marginRight: 5,
  },
  content: {
    padding: 5,

    justifyContent: "space-between",
  },
  description: {
    marginTop: 5,
    width: 330,
    textAlignVertical: "center",
  },
  date: {
    fontWeight: "400",
    color: "grey",
  },
});

export default ReviewItem;
