import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import Header from "./Header"; // Ensure the path is correct
import theme from "./Theme";

function ScheduledConsultation({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.title}>Scheduled Consultation</Text>
        <View style={styles.subContent}>
          <View style={styles.iconContainer}>
            <Ionicons name="calendar-outline" size={104} color="grey" />
            <Text style={styles.subtitle}>You don't have any scheduled</Text>
            <Text style={styles.subtitle}>appointment at the moment</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              /* Add navigation or action here */
            }}
          >
            <Text style={styles.buttonText}>Find a Doctor</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "left",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  subContent: {
    // backgroundColor: "red",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    color: "grey",
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ScheduledConsultation;
