import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ReviewsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avis</Text>
      <Text>Aucun avis pour le moment</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

