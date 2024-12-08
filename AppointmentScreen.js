import { StyleSheet, Text, View } from 'react-native';

function AppointmentScreen() {
  return (
    <View style={styles.container}>
      <Text>Appointment Screen</Text>
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

export default AppointmentScreen;
