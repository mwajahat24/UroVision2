import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import Feedback from "./Feedback"; // Adjust the path as necessary
import theme from "./Theme";

const Stack = createStackNavigator();

function FeedbackStack() {
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
        name="FeedbackScreen"
        component={Feedback}
        options={{ title: "Feedback", headerTitleAlign: "center" }}
      />
    </Stack.Navigator>
  );
}

export default FeedbackStack;
