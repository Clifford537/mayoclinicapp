import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Visit {
  id: number;
  visit_number: string;
  date: string;
  reason_for_visit: string;
}

export default function VisitsScreen() {
  const db = useSQLiteContext();
  const router = useRouter();

  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        if (!token) return;

        const userId = parseInt(token.replace('user-', ''), 10);
        const results = await db.getAllAsync<Visit>(
          `SELECT id, visit_number, date, reason_for_visit
           FROM patient_notes
           WHERE patient_id = ?
           ORDER BY date DESC`,
          [userId]
        );

        setVisits(results ?? []);
      } catch (err) {
        console.error('[VisitsScreen] Failed to fetch visits:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  const onConnectBluetooth = () => {
    router.push('/connect'); // navigate to the "connect" tab/screen
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading visits...</Text>
      </View>
    );
  }

  if (visits.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyTitle}>No visits found.</Text>
        <Text style={styles.emptySubtitle}>
          Please connect via Bluetooth to add notes from your clinician.
        </Text>
        <TouchableOpacity style={styles.connectButton} onPress={onConnectBluetooth}>
          <Text style={styles.connectButtonText}>Connect Bluetooth</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={visits}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.visitCard}>
          <Text style={styles.visitTitle}>Visit #{item.visit_number}</Text>
          <Text style={styles.visitDate}>Date: {item.date}</Text>
          <Text style={styles.visitReason}>Reason: {item.reason_for_visit}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#444',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  connectButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 30,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 5,
  },
  connectButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  visitCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  visitTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  visitDate: {
    fontSize: 14,
    color: '#444',
  },
  visitReason: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
