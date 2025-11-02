import { StyleSheet, ScrollView, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/lib/hooks/useAuth';

export default function HomeScreen() {
  const { user, isAuthenticated, loading } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">
          {isAuthenticated && user 
            ? `Bienvenue, ${user.name}! 👋` 
            : 'Bienvenue sur Khidmi'
          }
        </ThemedText>
        <ThemedText type="subtitle">
          Vos services à domicile au Maroc
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.content}>
        {!isAuthenticated ? (
          <ThemedText>Connectez-vous pour commencer</ThemedText>
        ) : (
          <ThemedText>Contenu personnalisé à venir...</ThemedText>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  content: {
    padding: 20,
  },
});
