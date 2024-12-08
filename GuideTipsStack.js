import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GuideTips from "./GuideTips"; // Ensure the path is correct
import { Ionicons } from "@expo/vector-icons";
import theme from "./Theme";

const Stack = createStackNavigator();

function GuideTipsStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
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
      }}
    >
      <Stack.Screen
        name="GuideTips"
        component={GuideTips}
        options={{ title: "Guide & Tips", headerTitleAlign: "center" }}
      />
    </Stack.Navigator>
  );
}

export default GuideTipsStack;
