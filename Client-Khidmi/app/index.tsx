import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const hasCompletedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding');
      const isAuthenticated = await AsyncStorage.getItem('authToken');

      if (!hasCompletedOnboarding) {
        // Première fois - montrer l'onboarding
        router.replace('/(onboarding)');
      } else if (isAuthenticated) {
        // Déjà connecté - aller aux tabs
        router.replace('/(tabs)');
      } else {
        // Onboarding fait mais pas connecté - aller au login
        router.replace('/(auth)/login');
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      router.replace('/(onboarding)');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

