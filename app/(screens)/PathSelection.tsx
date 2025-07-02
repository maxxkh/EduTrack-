import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const PathSelectionScreen = () => {
  const navigation = useNavigation<any>()
  const learningPaths = [
    {
      id: '(screens)/CourseSelection',
      title: 'Frontend Development',
      description: 'Build beautiful, interactive web interfaces',
      skills: ['HTML5', 'CSS3', 'React', 'TypeScript', 'UI/UX'],
      icon: 'web',
      color: ['#6366F1', '#8B5CF6'], // Indigo to Purple gradient
      pattern: '••••••'
    },
    {
      id: 'backend',
      title: 'Backend Engineering',
      description: 'Architect powerful server systems',
      skills: ['Node.js', 'Python', 'SQL', 'APIs', 'Cloud'],
      icon: 'storage',
      color: ['#10B981', '#34D399'], // Emerald gradient
      pattern: '⌘⌘⌘⌘⌘⌘'
    },
    {
      id: 'mobile',
      title: 'Mobile Development',
      description: 'Create native cross-platform experiences',
      skills: ['React Native', 'Swift', 'Kotlin', 'Flutter'],
      icon: 'smartphone',
      color: ['#3B82F6', '#60A5FA'], // Blue gradient
      pattern: '◈◈◈◈◈◈'
    }
  ];

  const handlePathSelect = (pathId: any) => {
    navigation.navigate(pathId );
  };

  const cardScale = new Animated.Value(1);

  const animateCardPress = () => {
    Animated.sequence([
      Animated.timing(cardScale, {
        toValue: 0.96,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(cardScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();
  };

  return (
    <View className="flex-1 bg-gray-50">
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

      {/* Cards with Interactive Animations */}
      <ScrollView 
        className="px-5 pt-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {learningPaths.map((path) => (
          <Animated.View
            key={path.id}
            className="bg-white rounded-3xl shadow-sm mb-6 overflow-hidden"
            style={{
              shadowColor: path.color[0],
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 10,
              elevation: 6,
              transform: [{ scale: cardScale }]
            }}
          >
            <LinearGradient
              colors={path.color as any}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="h-2"
            />

            <View className="p-6">
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <MaterialIcons 
                      name={path.icon as    any} 
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

              {/* Skills chips with better spacing */}
              <View className="flex-row flex-wrap mt-3 -ml-1">
                {path.skills.map((skill, i) => (
                  <View 
                    key={i} 
                    className="px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 m-1"
                  >
                    <Text className="text-gray-700 text-sm font-medium">
                      {skill}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Enhanced Progress with Estimated Time */}
              <View className="mt-5 mb-5">
                <View className="flex-row justify-between mb-2">
                  <Text className="text-xs text-gray-500 font-medium">
                    PATH PROGRESS
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="text-xs font-bold mr-1" style={{ color: path.color[0] }}>
                      0%
                    </Text>
                    <Text className="text-xs text-gray-400">
                      • Est. 3-6 months
                    </Text>
                  </View>
                </View>
                <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <LinearGradient
                    colors={path.color as any}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="h-full rounded-full"
                    style={{ width: '0%' }}
                  />
                </View>
              </View>

              {/* Enhanced CTA Button */}
              <TouchableOpacity
                className="py-4 rounded-xl items-center mt-2 overflow-hidden"
                activeOpacity={0.85}
                onPressIn={animateCardPress}
                onPress={() => handlePathSelect(path.id)}
              >
                <LinearGradient
                  colors={path.color as any}
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
        ))}
      </ScrollView>


    </View>
  );
};

export default PathSelectionScreen;