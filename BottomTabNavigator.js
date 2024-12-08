import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Import your screen components
import Home from "./Home"; // Adjust the path as necessary
import AlertsScreen from "./AlertsScreen"; // Adjust the path as necessary
import ScanScreen from "./ScanScreen"; // Adjust the path as necessary
import ScheduledConsultation from "./ScheduledConsultation"; // Adjust the path as necessary
import ProfileScreen from "./ProfileScreen"; // Adjust the path as necessary
import theme from "./Theme";

const Tab = createBottomTabNavigator();

function BottomTabNavigator({ route }) {
  const { firstName } = route.params || {};
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Alerts") {
            iconName = "notifications-outline";
          } else if (route.name === "Scan") {
            iconName = "scan-outline";
          } else if (route.name === "Appointment") {
            iconName = "calendar-outline";
          } else if (route.name === "Profile") {
            iconName = "person-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={theme.colors.primary}
            />
          );
        },
        tabBarActiveTintColor: theme.colors.primary, // Change the active tab color to #51ACFF
        tabBarInactiveTintColor: "black",
        tabBarStyle: {
          display: "flex",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingTop: 5,
          height: 65, // Increase height to accommodate the padding and center items vertically
        },
        tabBarLabelStyle: {
          paddingBottom: 10, // Add padding to center the label vertically with the icon
        },
        tabBarIconStyle: {
          marginTop: 10, // Add margin to center the icon vertically with the label
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ firstName }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Alerts"
        component={AlertsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Appointment"
        component={ScheduledConsultation}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
