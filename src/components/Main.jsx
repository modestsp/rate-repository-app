import React from "react";
import { StyleSheet, View } from "react-native";
import RepositoryList from "./Repositories/RepositoryList.jsx";
import AppBar from "./AppBar/AppBar";
import { Route, Routes, Navigate } from "react-router-native";
import SignIn from "./Sign/SignIn.jsx";
import SignUp from "./Sign/SignUp.jsx";
import SingleRepository from "./Repositories/SingleRepository.jsx";
import { CreateReview } from "./Repositories/CreateReview.jsx";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/:id" element={<SingleRepository />} exact />
        <Route path="/sign" element={<SignIn />} exact />
        <Route path="/create-review" element={<CreateReview />} exact />
        <Route path="/sign-up" element={<SignUp />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
