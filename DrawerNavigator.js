import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import BottomTabNavigator from "./BottomTabNavigator"; // Ensure the path is correct
import CustomDrawerContent from "./CustomDrawerContent"; // Ensure the path is correct

import GuideTipsStack from "./GuideTipsStack"; // Ensure the path is correct
import PatientHistoryStack from "./PatientHistoryStack"; // Ensure the path is correct
import FeedbackStack from "./FeedbackStack"; // Ensure the path is correct
import HelpStack from "./HelpStack"; // Ensure the path is correct
import SettingsStack from "./SettingsStack"; // Ensure the path is correct
import LogOutStack from "./LogOutStack"; // Ensure the path is correct

import LoadingScreen from "./LoadingScreen"; // Ensure the path is correct
import DiagnosisReport from "./DiagnosisReport"; // Ensure the path is correct
import SymptomTracker2 from "./SymptomTracker2"; // Ensure the path is correct
import SymptomTrackerStack from "./SymptomTrackerStack";
import DiagnosisReportStack from "./DiagnosisReportStack";
import FindDoctorStack from "./FindADoctorStack";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Main Stack Navigator to handle nested navigation
function MainStackNavigator({ route }) {
  const { firstName } = route.params || {};
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HomeTabs"
        component={BottomTabNavigator}
        initialParams={{ firstName }}
      />
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="DiagnosisReport" component={DiagnosisReport} />
      <Stack.Screen name="SymptomTracker" component={SymptomTrackerStack} />
      <Stack.Screen name="SymptomTracker2" component={SymptomTracker2} />
      <Stack.Screen
        name="DiagnosisReportStack"
        component={DiagnosisReportStack}
      />
      <Stack.Screen name="FindDoctorStack" component={FindDoctorStack} />
    </Stack.Navigator>
  );
}

// Drawer Navigator
function DrawerNavigator({ route }) {
  // Extract user data from route params
  const { firstName, lastName, email } = route.params || {};

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          firstName={firstName}
          lastName={lastName}
          email={email}
        />
      )}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#fff",
          width: 240,
        },
      }}
    >
      <Drawer.Screen
        name="HomeTabsMain"
        component={MainStackNavigator}
        initialParams={{ firstName }}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="GuideTipsDrawer"
        component={GuideTipsStack}
        options={{
          drawerLabel: "Guide & Tips",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="PatientHistoryDrawer"
        component={PatientHistoryStack}
        options={{
          drawerLabel: "Patient History",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="folder-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="HelpDrawer"
        component={HelpStack}
        options={{
          drawerLabel: "Help",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="SettingsDrawer"
        component={SettingsStack}
        options={{
          drawerLabel: "Settings",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="LogOutDrawer"
        component={LogOutStack}
        options={{
          drawerLabel: "LogOut",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
