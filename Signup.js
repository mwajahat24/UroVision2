import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function Signup({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Signup Screen</Text>
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
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

export default Signup;
