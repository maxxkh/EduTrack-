import Stack from 'expo-router/stack'
import { useFrameworkReady } from '../hooks/useFrameworkReady'
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function Layout() {
  useFrameworkReady();
  return <Stack screenOptions={{ headerShown: false }} />;
}
