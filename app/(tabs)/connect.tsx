import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Alert, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ConnectScreen() {
  // Open Bluetooth settings on device
  const openBluetoothSettings = async () => {
    try {
      if (Platform.OS === 'android') {
        // Opens the main settings screen on Android (best available)
        await Linking.openSettings();
      } else if (Platform.OS === 'ios') {
        // iOS URL scheme to open Bluetooth settings (works on iOS 11+)
        const url = 'App-Prefs:Bluetooth';
        const canOpen = await Linking.canOpenURL(url);
        if (canOpen) {
          await Linking.openURL(url);
        } else {
          Alert.alert('Info', 'Please open Bluetooth settings manually.');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open Bluetooth settings.');
      console.error('openBluetoothSettings error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="bluetooth-connect" size={80} color="#007AFF" />
      <Text style={styles.title}>Connect with Clinician</Text>
      <Text style={styles.description}>
        Use Bluetooth to securely sync your notes with your clinician’s desktop application.
      </Text>

      <TouchableOpacity style={styles.button} onPress={openBluetoothSettings} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Open Bluetooth Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 12,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
