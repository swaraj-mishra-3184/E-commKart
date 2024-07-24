import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserProfile } from '../api';
import { LinearProgress } from 'react-native-elements';

const ProfileScreen = ({ onLogout }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define the fetchUserProfile function
  const fetchUserProfile = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      console.log('Stored userId:', userId); // Add this line
      if (!userId) {
        console.error('User ID not found in AsyncStorage');
        return;
      }
      const profileData = await getUserProfile(userId);
      setUserDetails(profileData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchUserProfile inside useEffect
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    onLogout();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <LinearProgress color="#FF3B30" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {userDetails ? (
        <View style={styles.profileContainer}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{userDetails.name.firstname} {userDetails.name.lastname}</Text>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{userDetails.username}</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>No user details found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profileContainer: {
    width: '80%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  value: {
    fontSize: 16,
    marginTop: 8,
  },
  button: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfileScreen;
