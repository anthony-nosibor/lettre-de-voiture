import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#0B5FFF' },
        headerTintColor: '#fff',
        contentStyle: { backgroundColor: '#F4F7FF' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Nouvelle lettre de voiture' }} />
    </Stack>
  );
}
