import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import PatientHistory from "./PatientHistory"; // Adjust the path as necessary
import theme from "./Theme";

const Stack = createStackNavigator();

function PatientHistoryStack() {
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
        name="PatientHistoryScreen"
        component={PatientHistory}
        options={{ title: "Patient History", headerTitleAlign: "center" }}
      />
    </Stack.Navigator>
  );
}

export default PatientHistoryStack;
