import Stack from 'expo-router/stack';
import { StyleSheet } from 'nativewind';

StyleSheet.setFlag('darkMode', 'class');

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
