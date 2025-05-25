import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Helper to format date nicely (e.g. Monday, May 25, 2025)
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export default function HomeScreen() {
  const currentDate = formatDate(new Date());

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{currentDate}</Text>
      <Text style={styles.title}>Welcome to your Mayo Patients App</Text>
      <Text style={styles.description}>
        Here you’ll see your summary of visits and track your vitals seamlessly.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  dateText: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 300,
  },
});
