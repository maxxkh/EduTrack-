
import React from 'react';
import { View, ScrollView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header  from '../components/Header';
import PathCard from '../components/PathCard';
import  LearningPath  from '../../interfaces';



const PathSelectionScreen = () => {
  const navigation = useNavigation<any>();

  const learningPaths: LearningPath[] = [
    {
      id: '(screens)/CourseSelection',
      title: 'Frontend Development',
      description: 'Build beautiful, interactive web interfaces',
      skills: ['HTML5', 'CSS3', 'React', 'TypeScript', 'UI/UX'],
      icon: 'web',
      color: ['#6366F1', '#8B5CF6'],
      pattern: '••••••'
    },
    {
      id: 'backend',
      title: 'Backend Engineering',
      description: 'Architect powerful server systems',
      skills: ['Node.js', 'Python', 'SQL', 'APIs', 'Cloud'],
      icon: 'storage',
      color: ['#10B981', '#34D399'],
      pattern: '⌘⌘⌘⌘⌘⌘'
    },
    {
      id: 'mobile',
      title: 'Mobile Development',
      description: 'Create native cross-platform experiences',
      skills: ['React Native', 'Swift', 'Kotlin', 'Flutter'],
      icon: 'smartphone',
      color: ['#3B82F6', '#60A5FA'],
      pattern: '◈◈◈◈◈◈'
    }
  ];

  const handlePathSelect = (pathId: string) => {
    navigation.navigate(pathId);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <Header />
      
      <ScrollView 
        className="px-5 pt-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {learningPaths.map((path) => (
          <PathCard
            key={path.id}
            path={path}
            onPress={() => handlePathSelect(path.id)}
  
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default PathSelectionScreen;