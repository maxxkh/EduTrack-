import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Header = () => {
  return (
    <LinearGradient
      colors={['#FFFFFF', '#F9FAFB']}
      className="px-6 pt-16 pb-8 shadow-sm"
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Text className="text-3xl font-bold text-gray-900 mb-1">
        Discover Your <Text className="text-indigo-600">Career Path</Text>
      </Text>
      <Text className="text-gray-500 text-lg">
        Select your focus area to begin your journey
      </Text>
      <View className="mt-4 h-1.5 w-28 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
    </LinearGradient>
  );
};

export default Header;