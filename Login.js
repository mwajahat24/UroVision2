import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Main', { screen: 'Home' })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
