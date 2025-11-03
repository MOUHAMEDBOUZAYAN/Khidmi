import { Stack } from 'expo-router';

export default function BookingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Réservations' }} />
      <Stack.Screen name="[id]" options={{ title: 'Détails' }} />
    </Stack>
  );
}

