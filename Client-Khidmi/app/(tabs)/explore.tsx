import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Services</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.card}
          onPress={() => router.push('/(services)')}
        >
          <Text style={styles.cardTitle}>🔌 Électricité</Text>
          <Text style={styles.cardSubtitle}>Trouvez un électricien</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => router.push('/(services)')}
        >
          <Text style={styles.cardTitle}>🔧 Plomberie</Text>
          <Text style={styles.cardSubtitle}>Trouvez un plombier</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => router.push('/(services)')}
        >
          <Text style={styles.cardTitle}>🧹 Ménage</Text>
          <Text style={styles.cardSubtitle}>Femme de ménage</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => router.push('/(services)')}
        >
          <Text style={styles.cardTitle}>💇 Coiffure</Text>
          <Text style={styles.cardSubtitle}>Trouvez un coiffeur</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
  },
});
