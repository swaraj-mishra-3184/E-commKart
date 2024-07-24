import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity
} from 'react-native';
import { registerUser } from '../api';
import { Icon } from 'react-native-elements';
import { LinearProgress } from 'react-native-elements';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    const userDetails = {
      name,
      username,
      password,
    };

    setLoading(true);

    try {
      await registerUser(userDetails);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Registration failed:', error);
      Alert.alert('Error', 'An error occurred during registration.');
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <Icon
          name={showPassword ? 'eye' : 'eye-off'}
          type="feather"
          onPress={() => setShowPassword(!showPassword)}
          containerStyle={styles.eyeIcon}
        />
      </View>
      {loading && <LinearProgress color="#FF3B30" />}
      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  passwordContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  button: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#FF3B30',
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
