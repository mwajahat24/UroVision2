import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import SymptomTracker from "./SymptomTracker"; // Adjust the path as necessary
import SymptomTracker2 from "./SymptomTracker2";
import theme from "./Theme";

const Stack = createStackNavigator();

function SymptomTrackerStack() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerLeft: () => (
          <Ionicons
            name="arrow-back"
            size={24}
            color="white"
            style={{ marginLeft: 15 }}
            onPress={() => navigation.goBack()}
          />
        ),
      })}
    >
      <Stack.Screen
        name="SymptomTrackerScreen"
        component={SymptomTracker}
        options={{ title: "Symptom Tracker" }}
      />
      <Stack.Screen
        name="SymptomTracker2"
        component={SymptomTracker2}
        options={{ title: "Log Symptoms" }}
      />
    </Stack.Navigator>
  );
}

export default SymptomTrackerStack;
