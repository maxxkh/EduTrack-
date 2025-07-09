import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { SharedValue } from 'react-native-reanimated';
import PathProgress from './PathProgress';
import SkillsList from './SkillsList';
interface PathCardProps {
  path: {
    id: string;
    title: string;
    description: string;
    skills: string[];
    icon: string;
    color: [string, string, ...string[]];
    pattern: string;
  };
  onPress: () => void;

}

const PathCard: React.FC<PathCardProps> = ({ path, onPress }) => {
  return (
    <Animated.View
      className="bg-white rounded-3xl shadow-sm mb-6 overflow-hidden"
      style={{
        shadowColor: path.color[0],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 6,
      }}
    >
      <LinearGradient
        colors={path.color}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="h-2"
      />

      <View className="p-6">
        <View className="flex-row justify-between items-start mb-4">
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <MaterialIcons 
                name={path.icon as any} 
                size={24} 
                color={path.color[0]} 
                className="mr-2" 
              />
              <Text className="text-2xl font-bold text-gray-900">
                {path.title}
              </Text>
            </View>
            <Text className="text-gray-600 text-base">
              {path.description}
            </Text>
          </View>
        </View>

        <SkillsList skills={path.skills} />

        <PathProgress color={path.color} />

        <TouchableOpacity
          className="py-4 rounded-xl items-center mt-2 overflow-hidden"
          activeOpacity={0.85}
          onPress={onPress}
        >
          <LinearGradient
            colors={path.color}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="absolute inset-0"
          />
          <Text className="text-white font-bold text-base">
            Explore Path →
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default PathCard;