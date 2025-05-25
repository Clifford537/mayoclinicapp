import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.noAppointmentsText}>
        You don’t have any upcoming appointments.
      </Text>

      <Calendar
        style={styles.calendar}
        theme={{
          selectedDayBackgroundColor: '#007AFF',
          todayTextColor: '#007AFF',
          arrowColor: '#007AFF',
          monthTextColor: '#000',
          textMonthFontWeight: 'bold',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
          // Additional styling for consistency
          dayTextColor: '#222',
          textDisabledColor: '#ccc',
          dotColor: '#007AFF',
          selectedDotColor: '#fff',
        }}
        // Example markedDates to illustrate how appointments could be marked
        // markedDates={{
        //   '2025-05-25': { marked: true, dotColor: '#007AFF' },
        // }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 20,
  },
  noAppointmentsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#444',
    marginBottom: 12,
    fontWeight: '600',
  },
  calendar: {
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 4,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
});
