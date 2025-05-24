import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('Notes');

  const contentMap: Record<string, React.ReactNode> = {
    Notes: (
      <FlatList
        data={[
          { id: '1', title: 'Follow-up with Dr. Smith' },
          { id: '2', title: 'Blood pressure log - Week 3' },
          { id: '3', title: 'Questions for next visit' },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        )}
      />
    ),
    Visits: (
      <FlatList
        data={[
          { id: '1', title: 'Cardiology - Jan 10, 2025' },
          { id: '2', title: 'Dermatology - Feb 21, 2025' },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        )}
      />
    ),
    Reminder: (
      <FlatList
        data={[
          { id: '1', title: 'Take medication at 9:00 AM' },
          { id: '2', title: 'Stretch every 2 hours' },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        )}
      />
    ),
    Schedule: (
      <View style={styles.itemCard}>
        <Text style={styles.itemText}>📅 Calendar Placeholder</Text>
        <Text style={styles.subText}>Upcoming: Physical Therapy - May 15</Text>
      </View>
    ),
  };

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  const handleLogout = () => Alert.alert('Logout', 'You have been logged out.');

  const handlePairing = async () => {
    try {
      const bluetoothUrl =
        Platform.OS === 'ios'
          ? 'App-Prefs:Bluetooth'
          : 'android.settings.BLUETOOTH_SETTINGS';
      const supported = await Linking.canOpenURL(bluetoothUrl);
      if (supported) {
        await Linking.openURL(bluetoothUrl);
      } else {
        await Linking.openSettings();
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to open Bluetooth settings.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <Text style={styles.userInfo}>Hello, John Doe</Text>
        <View style={styles.topButtons}>
          <TouchableOpacity onPress={handlePairing} style={styles.iconButton}>
            <MaterialIcons name="bluetooth-connected" size={22} color="#005DAA" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.iconButton}>
            <AntDesign name="logout" size={22} color="#005DAA" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.contentArea}>
        {contentMap[activeTab]}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {['Notes', 'Visits', 'Schedule', 'Reminder'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.footerButton}
            onPress={() => handleTabPress(tab)}
          >
            <AntDesign
              name={
                tab === 'Notes'
                  ? 'filetext1'
                  : tab === 'Visits'
                  ? 'eye'
                  : tab === 'Schedule'
                  ? 'calendar'
                  : 'bells'
              }
              size={22}
              color={activeTab === tab ? '#003f7f' : '#005DAA'}
            />
            <Text
              style={[
                styles.footerText,
                activeTab === tab && { fontWeight: 'bold' },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  userInfo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#005DAA',
  },
  topButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
  },
  contentArea: {
    flex: 1,
    padding: 16,
  },
  itemCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#005DAA',
    marginTop: 4,
  },
});