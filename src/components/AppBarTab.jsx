import { StyleSheet } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-native";

// return (

// );

const AppBarTab = ({ children, to }) => {
  const [signOut, setSignOut] = useState(false);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const logout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/sign", { replace: true });
  };
  useEffect(() => {
    if (children === "Sign Out") {
      console.log("HAY LOGOUT");
      setSignOut(true);
    }
  }, []);

  return signOut ? (
    <Pressable onPress={logout}>
      <Text fontWeight="bold" color="textSecondary" style={styles.tabs}>
        {children}
      </Text>
    </Pressable>
  ) : (
    <Link to={to}>
      <Text fontWeight="bold" color="textSecondary" style={styles.tabs}>
        {children}
      </Text>
    </Link>
  );
};

const styles = StyleSheet.create({
  tabs: {
    margin: 10,
    color: "white",
  },
});

export default AppBarTab;
