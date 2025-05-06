import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  // Hardcoded credentials
  const validEmail = 'useremail@gmail.com';
  const validPassword = 'password!';

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter both email and password');
      return;
    }

    if (email === validEmail && password === validPassword) {
      Alert.alert('Login successful', `Welcome, ${email}`);
      router.push('/Homepage');
    } else {
      Alert.alert('Login failed', 'Invalid email or password');
    }
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google Login', 'Redirecting to Google login...');
  };

  const navigateToRegister = () => {
    router.push('/register');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdpMLJmZR8r2omq_jCc9Hhp8nc-iyKbUAKMA&s',
            }}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Mayo Clinic Login</Text>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
            placeholderTextColor="#888"
          />

          {/* Password with visibility toggle */}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
              style={styles.passwordInput}
              placeholderTextColor="#888"
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <AntDesign
                name={passwordVisible ? 'eye' : 'eyeo'}
                size={20}
                color="#888"
                style={{ paddingHorizontal: 8 }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>OR</Text>

          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
            <AntDesign name="google" size={20} color="#DB4437" style={{ marginRight: 8 }} />
            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={navigateToRegister}>
            <Text style={styles.linkText}>Don’t have an account? Register</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const PRIMARY_COLOR = '#005DAA';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f7fafd',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    marginBottom: 20,
  },
  input: {
    width: '90%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: 180,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  orText: {
    marginVertical: 15,
    fontSize: 16,
    color: '#666',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DB4437',
    borderWidth: 1.2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 220,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  googleText: {
    color: '#DB4437',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    marginTop: 15,
  },
  linkText: {
    color: PRIMARY_COLOR,
    fontSize: 16,
  },
});
