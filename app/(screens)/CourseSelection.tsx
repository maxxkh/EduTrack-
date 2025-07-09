import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const CourseSelection = () => {
    const navigation = useNavigation<any>();
  const currentTrack = {
    name: 'Frontend Development',
    icon: 'code-slash',
    color: 'bg-indigo-100',
    textColor: 'text-indigo-800'
  };

  const courses = [
    {
      id: 'html-css',
      title: 'HTML & CSS Foundations',
      duration: '8 hours',
      icon: 'logo-html5',
      isNextStep: true,
      accentColor: '#E54C21' // HTML orange
    },
    {
      id: 'javascript',
      title: 'Modern JavaScript',
      duration: '12 hours',
      icon: 'logo-javascript',
      accentColor: '#F0DB4F' // JS yellow
    },
    {
      id: 'react',
      title: 'React Core Concepts',
      duration: '10 hours',
      icon: 'logo-react',
      accentColor: '#61DAFB' // React blue
    }
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <View className={`bg-indigo-600 pt-16 pb-8 px-6 rounded-b-3xl`}>
        <View className="absolute top-4 right-4 opacity-10">
          <Ionicons name="school" size={120} color="white" />
        </View>
        
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="absolute top-16 left-6 z-10"
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <View className="mt-6">
          <Text className="text-white text-2xl font-bold">Continue Learning</Text>
          <Text className="text-indigo-200 mt-1">Your {currentTrack.name} path</Text>
        </View>
      </View>

      <ScrollView className="px-6 mt-6" showsVerticalScrollIndicator={false}>
        {courses.map((course, index) => (
          <TouchableOpacity
          onPress={()=> navigation.navigate('(screens)/LessionViewer', { path: course.id })}
            key={course.id}
            className={`bg-white p-5 rounded-xl mb-4 shadow-sm relative overflow-hidden ${
              course.isNextStep ? 'border-l-4 border-indigo-500' : ''
            }`}
            activeOpacity={0.95}
          >
            <View 
              className="absolute top-0 right-0 w-16 h-16 opacity-10"
              style={{ backgroundColor: course.accentColor }}
            />
            
            <View className="flex-row items-center z-10">
              <View 
                className={`w-12 h-12 rounded-lg items-center justify-center mr-4`}
                style={{ backgroundColor: `${course.accentColor}20` }} // 20% opacity
              >
                <Ionicons 
                  name={course.icon as any} 
                  size={24} 
                  color={course.accentColor} 
                />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-gray-800 text-lg">{course.title}</Text>
                <Text className="text-gray-500 text-sm">{course.duration}</Text>
              </View>
              {course.isNextStep ? (
                <View className="bg-indigo-600 px-3 py-1 rounded-full">
                  <Text className="text-white text-sm">Start Here</Text>
                </View>
              ) : (
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="px-6 pb-6">
        <TouchableOpacity 
        onPress={() => navigation.navigate('(screens)/Dashboard')}
          className="bg-indigo-600 py-4 rounded-xl items-center flex-row justify-center shadow-md"
          activeOpacity={0.9}
        >
          <Text className="text-white font-medium mr-2"> Dashboard</Text>
          <Ionicons name="rocket" size={18} color="white" />
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

export default CourseSelection;