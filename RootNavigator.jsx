import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();


export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Auth' component={AuthStack} options={{ headerShown: false }} />
      <Stack.Screen name='drawer' component={DrawerNavigator} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}
