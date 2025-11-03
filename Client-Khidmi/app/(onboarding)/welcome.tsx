import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function OnboardingWelcome() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🎯</Text>
        <Text style={styles.title}>Bienvenue sur Khidmi!</Text>
        <Text style={styles.description}>
          La plateforme qui connecte les particuliers avec des prestataires de services locaux au Maroc
        </Text>
        <Text style={styles.bulletPoint}>✓ Électriciens, plombiers, femmes de ménage</Text>
        <Text style={styles.bulletPoint}>✓ Coiffeurs, peintres, menuisiers</Text>
        <Text style={styles.bulletPoint}>✓ Et bien plus encore...</Text>
      </View>

      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => router.replace('/(onboarding)')}>
          <Text style={styles.skipText}>Passer</Text>
        </TouchableOpacity>
        <View style={styles.dots}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/(onboarding)/search')}>
          <Text style={styles.nextText}>Suivant</Text>
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
  bulletPoint: {
    fontSize: 16,
    color: '#4A90E2',
    marginBottom: 10,
    paddingLeft: 20,
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
  nextButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
  },
  nextText: {
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
    backgroundColor: '#4A90E2',
    width: 24,
  },
});

