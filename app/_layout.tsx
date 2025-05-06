import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: 'Mayo Clinic', // Set the title
        headerStyle: { backgroundColor: '#005DAA' }, // Header background color
        headerTintColor: '#fff', // Title text color
        headerTitleStyle: { fontWeight: 'bold' }, // Make title bold
      }}
    />
  );
}
