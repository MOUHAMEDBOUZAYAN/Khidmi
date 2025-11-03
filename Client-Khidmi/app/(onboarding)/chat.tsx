import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingChat() {
  const handleGetStarted = async () => {
    await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
    router.replace('/(auth)/register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>💬</Text>
        <Text style={styles.title}>Communiquez facilement</Text>
        <Text style={styles.description}>
          Chattez directement avec votre prestataire
        </Text>
        <View style={styles.featureBox}>
          <Text style={styles.feature}>✓ Messages en temps réel</Text>
          <Text style={styles.feature}>✓ Partage de photos</Text>
          <Text style={styles.feature}>✓ Historique conservé</Text>
        </View>
      </View>

      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.skipText}>Précédent</Text>
        </TouchableOpacity>
        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>
        <TouchableOpacity style={styles.startButton} onPress={handleGetStarted}>
          <Text style={styles.startText}>Commencer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingTop: 80,
    paddingBottom: 50,
    paddingHorizontal: 30,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 80,
    textAlign: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 30,
  },
  featureBox: {
    backgroundColor: '#F0FDF4',
    padding: 25,
    borderRadius: 15,
    marginTop: 20,
  },
  feature: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 10,
    fontWeight: '500',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipText: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  startButton: {
    backgroundColor: '#50C878',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 25,
  },
  startText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dots: {
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D3D3D3',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#50C878',
    width: 24,
  },
});

