import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/lib/hooks/useAuth';
import { isValidEmail, isValidPhone } from '@/lib/utils/helpers';

export default function RegisterScreen() {
  const { register, loading, error } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'client' | 'prestataire'>('client');

  const handleRegister = async () => {
    console.log('🔵 [REGISTER] Début de l\'inscription');
    console.log('📋 [REGISTER] Données:', { name, email, phone, role, passwordLength: password.length });

    if (!name || !email || !phone || !password) {
      console.log('❌ [REGISTER] Champs manquants');
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (!isValidEmail(email)) {
      console.log('❌ [REGISTER] Email invalide:', email);
      Alert.alert('Erreur', 'Email invalide');
      return;
    }

    if (!isValidPhone(phone)) {
      console.log('❌ [REGISTER] Téléphone invalide:', phone);
      Alert.alert('Erreur', 'Numéro de téléphone invalide');
      return;
    }

    if (password.length < 6) {
      console.log('❌ [REGISTER] Mot de passe trop court');
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    try {
      console.log('🚀 [REGISTER] Envoi de la requête au backend...');
      await register({ name, email, phone, password, role });
      console.log('✅ [REGISTER] Inscription réussie!');
      Alert.alert('Succès', 'Inscription réussie!', [
        { text: 'OK', onPress: () => router.replace('/(tabs)') }
      ]);
    } catch (err: any) {
      console.log('❌ [REGISTER] Erreur:', err);
      console.log('❌ [REGISTER] Message d\'erreur:', err.message);
      console.log('❌ [REGISTER] Stack:', err.stack);
      Alert.alert('Erreur', err.message || 'Inscription échouée');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <Text style={styles.subtitle}>Créez votre compte Khidmi</Text>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Nom complet"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Téléphone (06XXXXXXXX)"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[styles.roleButton, role === 'client' && styles.roleButtonActive]}
          onPress={() => setRole('client')}
        >
          <Text style={[styles.roleText, role === 'client' && styles.roleTextActive]}>
            Client
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === 'prestataire' && styles.roleButtonActive]}
          onPress={() => setRole('prestataire')}
        >
          <Text style={[styles.roleText, role === 'prestataire' && styles.roleTextActive]}>
            Prestataire
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>S'inscrire</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
        <Text style={styles.linkText}>Déjà un compte? Connectez-vous</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 10,
    color: '#2C3E50',
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E1E8ED',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  roleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  roleButton: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#E1E8ED',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  roleButtonActive: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  roleText: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  roleTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4A90E2',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#4A90E2',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40,
    fontSize: 14,
  },
  errorContainer: {
    backgroundColor: '#FADBD8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  errorText: {
    color: '#E74C3C',
    textAlign: 'center',
  },
});

