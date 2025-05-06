import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomePage() {
  const [message, setMessage] = useState('');

  const showTempMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2000); // clear after 2 seconds
  };

  const handleViewNotes = () => {
    showTempMessage('Loading notes...');
    Alert.alert('View Notes', 'You clicked the View Notes button');
  };

  const handleViewVisits = () => {
    showTempMessage('Fetching visit history...');
    Alert.alert('View Visits', 'You clicked the View Visits button');
  };

  const handleScheduledVisits = () => {
    showTempMessage('Checking scheduled visits...');
    Alert.alert('Scheduled Visits', 'You clicked the Scheduled Visits button');
  };

  const handleNotesAndVisits = () => {
    showTempMessage('Loading notes & visits...');
    Alert.alert('Notes & Visits', 'You clicked the Notes & Visits button');
  };

  const handleSchedule = () => {
    showTempMessage('Opening scheduler...');
    Alert.alert('Schedule', 'You clicked the Schedule button');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Mayo Clinic</Text>

      <View style={styles.body}>
        <MaterialCommunityIcons
          name="bluetooth-connect"
          size={40}
          color="#005DAA"
          style={{ marginBottom: 10 }}
        />
        <Text style={styles.bodyText}>Your personalized Mayo Clinic App</Text>
        {message !== '' && <Text style={styles.messageText}>{message}</Text>}
      </View>

      {/* Buttons in a row */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleViewNotes}>
          <AntDesign name="filetext1" size={24} color="#fff" />
          <Text style={styles.buttonText}>View Notes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleViewVisits}>
          <AntDesign name="eye" size={24} color="#fff" />
          <Text style={styles.buttonText}>View Visits</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleScheduledVisits}>
          <AntDesign name="calendar" size={24} color="#fff" />
          <Text style={styles.buttonText}>Scheduled Visits</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleNotesAndVisits}>
          <AntDesign name="filetext1" size={24} color="#fff" />
          <Text style={styles.buttonText}>Notes & Visits</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSchedule}>
          <AntDesign name="calendar" size={24} color="#fff" />
          <Text style={styles.buttonText}>Schedule</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#005DAA',
    textAlign: 'center',
    marginVertical: 30,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  messageText: {
    marginTop: 12,
    fontSize: 16,
    color: '#005DAA',
    fontStyle: 'italic',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    width: '100%',
    paddingBottom: 30,
  },
  button: {
    backgroundColor: '#005DAA',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    width: 160,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});
