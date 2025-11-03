import { Stack } from 'expo-router';

export default function PaymentsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Paiements' }} />
      <Stack.Screen name="methods" options={{ title: 'Méthodes' }} />
    </Stack>
  );
}

