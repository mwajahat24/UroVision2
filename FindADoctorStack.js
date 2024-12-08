import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import FindDoctor from "./FindDoctor"; // Adjust the path as necessary
import theme from "./Theme";

const Stack = createStackNavigator();

function FindDoctorStack() {
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
        name="FindDoctorScreen"
        component={FindDoctor}
        options={{ title: "Find a Doctor" }}
      />
    </Stack.Navigator>
  );
}

export default FindDoctorStack;
