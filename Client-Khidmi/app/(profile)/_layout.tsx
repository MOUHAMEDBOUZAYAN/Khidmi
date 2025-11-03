import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Profil' }} />
      <Stack.Screen name="settings" options={{ title: 'Paramètres' }} />
    </Stack>
  );
}

