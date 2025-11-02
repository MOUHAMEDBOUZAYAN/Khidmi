import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PaymentMethodsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Méthodes de paiement</Text>
      <Text>Gérer vos moyens de paiement</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

