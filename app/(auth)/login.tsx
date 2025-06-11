import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const db = useSQLiteContext();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required.');
      return;
    }

    try {
      const result = await db.getFirstAsync<{
        id: number;
        email: string;
        password: string;
      }>(`SELECT id, email, password FROM patients WHERE email = ?`, [email]);

      if (!result || result.password !== password) {
        Alert.alert('Login Failed', 'Invalid email or password.');
        return;
      }

      await SecureStore.setItemAsync('userToken', `user-${result.id}`);
      router.replace('/(tabs)');
    } catch (err) {
      console.error('[Login] DB Query Error:', err);
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid
        extraScrollHeight={80}
        keyboardShouldPersistTaps="handled"
      >
        {/* Mayo Clinic Logo */}
        <Image
          source={{
            uri: 'https://1000logos.net/wp-content/uploads/2020/11/Mayo-Clinic-logo.png',
          }}
          style={styles.logo}
          resizeMode="contain"
          accessible
          accessibilityLabel="Mayo Clinic logo"
        />

        <Text style={styles.title}>Mayo Patients App Login</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              placeholderTextColor="#666"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              textContentType="password"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome
                name={showPassword ? 'eye-slash' : 'eye'}
                size={20}
                color="#444"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={onLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text
          style={styles.registerLink}
          onPress={() => router.push('/(auth)/register')}
        >
          Don't have an account?{' '}
          <Text style={styles.linkText}>Register</Text>
        </Text>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  logo: {
    width: width * 0.6,
    height: (width * 0.6) / 3,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    color: '#222',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    color: '#222',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  registerLink: {
    color: '#555',
    textAlign: 'center',
    fontSize: 14,
  },
  linkText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
