import Stack from 'expo-router/stack';

export default function Layout() {
  useFrameworkReady();
  return <Stack screenOptions={{ headerShown: false }} />;
}
