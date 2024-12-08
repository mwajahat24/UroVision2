import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const GuideTips = () => {
  const tips = [
    { id: 1, icon: 'info-circle', title: 'Stay Hydrated', description: 'Drinking plenty of water is essential for your health.' },
    { id: 2, icon: 'apple', title: 'Eat Healthy', description: 'A balanced diet helps to maintain your overall well-being.' },
    { id: 3, icon: 'heartbeat', title: 'Regular Exercise', description: 'Engaging in physical activities keeps your body fit.' },
    { id: 4, icon: 'medkit', title: 'Medical Check-ups', description: 'Regular health check-ups are important for early detection of issues.' },
    { id: 5, icon: 'bed', title: 'Proper Sleep', description: 'Ensure you get enough sleep for better health.' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Guide & Tips</Text>
      {tips.map((tip) => (
        <View key={tip.id} style={styles.tipContainer}>
          <FontAwesome name={tip.icon} size={24} color="black" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.tipTitle}>{tip.title}</Text>
            <Text style={styles.tipDescription}>{tip.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tipDescription: {
    fontSize: 16,
    color: '#555',
  },
});

export default GuideTips;
