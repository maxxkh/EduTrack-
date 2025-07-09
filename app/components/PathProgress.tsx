import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface PathProgressProps {
  color: [string, string, ...string[]];
}

const PathProgress: React.FC<PathProgressProps> = ({ color }) => {
  return (
    <View className="mt-5 mb-5">
      <View className="flex-row justify-between mb-2">
        <Text className="text-xs text-gray-500 font-medium">
          PATH PROGRESS
        </Text>
        <View className="flex-row items-center">
          <Text className="text-xs font-bold mr-1" style={{ color: color[0] }}>
            0%
          </Text>
          <Text className="text-xs text-gray-400">
            • Est. 3-6 months
          </Text>
        </View>
      </View>
      <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <LinearGradient
          colors={color}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="h-full rounded-full"
          style={{ width: '0%' }}
        />
      </View>
    </View>
  );
};

export default PathProgress;