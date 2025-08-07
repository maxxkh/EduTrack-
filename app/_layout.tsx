import Stack from 'expo-router/stack';
import { StyleSheet } from 'nativewind'
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

StyleSheet.setFlag('darkMode', 'class');

export default function Layout() {
  useFrameworkReady();
  return <Stack screenOptions={{ headerShown: false }} />;
}
