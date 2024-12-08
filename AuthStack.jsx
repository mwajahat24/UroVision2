import React from "react";
import SplashScreen from "./Screens/SplashScreen";
import OnboardingScreens from "./Screens/OnBoardingScreens";
import Login from "./Screens/Login";
import "react-native-gesture-handler";
import SignUp from "./Screens/SignUp";
import ForgotPassword from "./Screens/ForgotPassword";
import MailCheck from "./Screens/MailCheckScreen";
import SetNewPassword from "./Screens/SetNewPassword";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OnBoardingScreen"
        component={OnboardingScreens}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MailCheckScreen"
        component={MailCheck}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SetNewPassword"
        component={SetNewPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
