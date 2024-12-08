import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import theme from "./Theme";

const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <Ionicons
        name="menu"
        size={30}
        color="white"
        onPress={() => navigation.openDrawer()}
        style={styles.menuIcon}
      />
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>
          <Text style={styles.uroText}>Uro</Text>
          <Text style={styles.visionText}>Vision</Text>
        </Text>
        <Image
          source={require("./assets/kidneylogo.png")}
          style={styles.logoImage}
        />
      </View>
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: theme.colors.primary,
    paddingTop: Constants.statusBarHeight + 6,
    paddingBottom: 7,
  },
  menuIcon: {
    position: "relative",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    top: 2,
  },
  logoImage: {
    width: 30,
    height: 30,
    marginLeft: 5,
    marginRight: 10,
    marginBottom: 5,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 7,
  },
  uroText: {
    color: "hotpink",
  },
  visionText: {
    color: "white",
  },
});

export default Header;
