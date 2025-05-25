import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useRef, useState } from 'react';
import { useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const IDLE_TIMEOUT = 5 * 60 * 1000; // 5 minutes in mins

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const idleTimeoutRef = useRef<number | null>(null);

  // Logout function
  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setUserToken(null);
  };

  // Clear idle timeout
  const clearIdleTimeout = () => {
    if (idleTimeoutRef.current !== null) {
      clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = null;
    }
  };

  // Reset idle timer
  const resetIdleTimer = () => {
    clearIdleTimeout();
    idleTimeoutRef.current = setTimeout(() => {
      logout();
    }, IDLE_TIMEOUT);
  };

  // Initialize user token and idle timer
  useEffect(() => {
    SecureStore.getItemAsync('userToken').then(token => {
      setUserToken(token);
      setLoading(false);
      if (token) resetIdleTimer();
    });
  }, []);

  // Setup listeners for user activity (touch and keyboard)
  useEffect(() => {
    if (!userToken) return; // No need to track if logged out

    // Events to listen for user activity
    const events = ['touchstart', 'mousedown', 'keydown'];

    // Reset timer on any activity
    const activityHandler = () => {
      resetIdleTimer();
    };

    // Add event listeners to window
    events.forEach(event => window.addEventListener(event, activityHandler));

    return () => {
      clearIdleTimeout();
      events.forEach(event => window.removeEventListener(event, activityHandler));
    };
  }, [userToken]);

  if (loading) return null; // or a loading spinner

  if (!userToken) {
    // Not authenticated, redirect to login
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8e8e93',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0.5,
          borderTopColor: '#ccc',
          paddingBottom: insets.bottom || 10,
          paddingTop: 5,
          height: 60 + (insets.bottom || 10),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="visits"
        options={{
          title: 'Visits',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="hospital-box-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calender"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="connect"
        options={{
          title: 'Connect',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bluetooth-connect" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
