import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import Routes from "./src/routes/Routes";



export default class App extends React.Component {
  render() {
    return (
        <Routes />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
