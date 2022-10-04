import React from "react";
import { StyleSheet, View } from "react-native";
import RepositoryList from "./Repositories/RepositoryList.jsx";
import AppBar from "./AppBar/AppBar";
import { Route, Routes, Navigate, useParams } from "react-router-native";
import SignIn from "./SignIn";
import SingleRepository from "./Repositories/SingleRepository.jsx";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  const { id } = useParams();
  console.log("ID EN MAIN", id);
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/:id" element={<SingleRepository />} exact />
        <Route path="/sign" element={<SignIn />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
