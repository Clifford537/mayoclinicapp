import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

const DB_NAME = 'myapp.db';
const DB_DIR = `${FileSystem.documentDirectory}SQLite`;
const DB_PATH = `${DB_DIR}/${DB_NAME}`;

async function loadDatabase() {
  const asset = Asset.fromModule(require('../assets/db/myapp.db'));
  await asset.downloadAsync();

  // Ensure the SQLite directory exists
  const dirInfo = await FileSystem.getInfoAsync(DB_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(DB_DIR, { intermediates: true });
  }

  // Delete existing DB file if it exists
  const fileInfo = await FileSystem.getInfoAsync(DB_PATH);
  if (fileInfo.exists) {
    // await FileSystem.deleteAsync(DB_PATH);
    // console.log('Deleted existing database file.');
  }

  // Copy fresh DB file from asset if it doesn't exist (or after deletion)
  if (!fileInfo.exists) {
    await FileSystem.copyAsync({
      from: asset.localUri!,
      to: DB_PATH,
    });
    console.log('Copied fresh database file.');
  }
}

export default function RootLayout() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadDatabase()
      .then(() => setLoaded(true))
      .catch((err) => {
        console.error('[DB Load Error]', err);
      });
  }, []);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Loading database...</Text>
      </View>
    );
  }

  return (
    <SQLiteProvider databaseName={DB_NAME} useSuspense>
      <Stack
        screenOptions={{
          headerShown: true,        // Show header
          headerTitle: 'Mayo Patients App', // Set header title
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      />
    </SQLiteProvider>
  );
}
