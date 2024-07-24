import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../api';
import { Icon } from 'react-native-elements';

const LoginScreen = ({ navigation, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Username and password cannot be empty.');
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser(username, password);
      if (response && response.token) {
        await AsyncStorage.setItem('token', response.token);
        if (response.userId) {
          await AsyncStorage.setItem('userId', response.userId.toString());
        } else {
          console.error('userId is undefined');
        }
        onLoginSuccess();
      } else {
        Alert.alert('Error', 'Invalid username or password.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Error', 'An error occurred during login.');
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>E-commKart</Text>
      <Text style={styles.subtitle}>Please sign in to continue.</Text>
      <View style={styles.inputContainer}>
        <Icon name="mail" type="feather" color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={username}
          onChangeText={setUsername}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" type="feather" color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
        <Icon
          name={showPassword ? 'eye' : 'eye-off'}
          type="feather"
          color="#888"
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        />
      </View>
      <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Password recovery feature is not implemented yet')}>
        <Text style={styles.forgotText}>Forgot</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#FF3B30" />}
      <TouchableOpacity
        style={[
          styles.button,
          (username.trim() === '' || password.trim() === '') && styles.buttonDisabled,
        ]}
        onPress={handleLogin}
        disabled={username.trim() === '' || password.trim() === ''}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Don't have an account? <Text style={styles.signUpText}>Sign Up</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center', // Center align text
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 32,
    textAlign: 'center', // Center align text
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
  },
  eyeIcon: {
    marginLeft: 8,
  },
  forgotText: {
    alignSelf: 'flex-end',
    color: '#FF3B30',
    marginBottom: 32,
    textAlign: 'right', // Align text to the right
  },
  button: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#FF3B30',
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center', // Center align text
  },
  linkText: {
    color: '#888',
    textAlign: 'center', // Center align text
  },
  signUpText: {
    color: '#FF3B30',
  },
});

export default LoginScreen;
