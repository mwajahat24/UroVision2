import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import DiagnosisReport from "./DiagnosisReport";
import theme from "./Theme";

const Stack = createStackNavigator();

function DiagnosisReportStack() {
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
        name="DiagnosisReport"
        component={DiagnosisReport}
        options={{ title: "Diagnosis Report", headerTitleAlign: "center" }}
      />
    </Stack.Navigator>
  );
}

export default DiagnosisReportStack;
