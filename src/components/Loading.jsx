import { View, Text, StyleSheet } from "react-native";

const Loading = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.loading}>Loading...!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  loading: {
    fontSize: 50,
    fontWeight: "700",
  },
});
export default Loading;
