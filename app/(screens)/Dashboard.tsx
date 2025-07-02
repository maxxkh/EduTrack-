import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  // UX-optimized color scheme
  const navigation = useNavigation<any>();
  const colors = {
    primary: 'bg-indigo-600',
    secondary: 'bg-teal-400',
    card: 'bg-white',
    textPrimary: 'text-gray-800',
    textSecondary: 'text-gray-500',
    accent: 'bg-amber-400'
  };

  const user = {
    name: 'Alex',
    avatar: 'person-circle',
    stats: {
      level: 'Advanced',
      progress: 78,
      streak: 14,
      completed: 32,
      weeklyGoal: 4,
    },
    courses: [
      { 
        id: 1, 
        title: 'Advanced React', 
        progress: 68, 
        icon: 'logo-react', 
        nextLesson: 'Context API',
        timeEstimate: '25 min'
      },
      { 
        id: 2, 
        title: 'UI/UX Design', 
        progress: 45, 
        icon: 'color-palette', 
        nextLesson: 'Figma Basics',
        timeEstimate: '18 min'
      },
    ],
    recommendations: [
      { 
        id: 1, 
        title: 'State Management', 
        type: 'video', 
        duration: '18 min', 
        icon: 'play-circle' 
      },
      { 
        id: 2, 
        title: 'CSS Grid', 
        type: 'tutorial', 
        duration: '25 min', 
        icon: 'code-working' 
      },
    ]
  };

  // UX Micro-interactions state
  const [activeButton, setActiveButton] = React.useState('all');

  return (
    <ScrollView 
      className="flex-1 bg-gray-50"
      showsVerticalScrollIndicator={false}
    >
      {/* Enhanced Header with Avatar */}
      <View className={`${colors.primary} pt-16 pb-8 px-6 rounded-b-3xl`}>
        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-row items-center">
            <TouchableOpacity 
              className="mr-3"
              activeOpacity={0.7}
              accessibilityLabel="User profile"
            >
              <Ionicons name={user.avatar as any} size={32} color="white" />
            </TouchableOpacity>
            <View>
              <Text className={`text-white text-lg`}>Welcome back,</Text>
              <Text className={`text-white text-2xl font-bold`}>{user.name}!</Text>
            </View>
          </View>
          {/* Settings Icon */}
          <TouchableOpacity
            className="ml-4"
            activeOpacity={0.7}
            accessibilityLabel="Settings"
            onPress={() => {
              // TODO: Navigate to settings screen or open settings modal
              navigation.navigate('(screens)/SettingsScreen');
            }}
          >
            <Ionicons name="settings-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>
        {/* Animated Progress Ring with Tooltip */}
        <View className="self-center w-40 h-40 rounded-full border-8 border-white border-opacity-20 items-center justify-center mb-2">
          <View className="absolute w-36 h-36 rounded-full border-8 border-teal-300 border-opacity-30" />
          <View 
            className="absolute w-36 h-36 rounded-full border-8 border-white border-t-transparent"
            style={{ transform: [{ rotate: `${user.stats.progress * 3.6}deg` }] }}
          />
          <View className="items-center">
            <Text className={`text-white text-3xl font-bold`}>{user.stats.progress}%</Text>
            <Text className={`text-white text-opacity-80 text-xs`}>Monthly Progress</Text>
          </View>
        </View>
      </View>
      {/* Stats Cards with Improved Information Architecture */}
      <View className="flex-row flex-wrap justify-between px-6 -mt-8 mb-6">
        {[
          { 
            label: 'Day Streak', 
            value: user.stats.streak, 
            icon: 'flame', 
            color: 'text-amber-400',
            tooltip: 'Current learning streak'
          },
          { 
            label: 'Completed', 
            value: user.stats.completed, 
            icon: 'checkmark-done', 
            color: 'text-emerald-400',
            tooltip: 'Total lessons finished'
          },
          { 
            label: 'Weekly Goal', 
            value: `${user.stats.weeklyGoal}/5`, 
            icon: 'calendar', 
            color: 'text-blue-400',
            tooltip: 'Weekly target progress'
          },
        ].map((stat, index) => (
          <TouchableOpacity
            key={index}
            className={`${colors.card} w-[30%] p-3 rounded-2xl shadow-sm mb-2 items-center`}
            activeOpacity={0.9}
            accessibilityLabel={stat.tooltip}
          >
            <Ionicons
              name={stat.icon as any} 
              size={20} 
              color={stat.color.replace('text-', '')} 
              className="mb-1"
            />
            <Text className="font-bold text-gray-800 text-lg">{stat.value}</Text>
            <Text className="text-gray-500 text-xs text-center">{stat.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Enhanced Course Cards with Time Awareness */}
      <View className="px-6 mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-gray-800">Continue Learning</Text>
          <TouchableOpacity 
            className="flex-row items-center"
            activeOpacity={0.7}
          >
            <Text className="text-indigo-600 mr-1">View All</Text>
            <Ionicons name="chevron-forward" size={16} color="#4F46E5" />
          </TouchableOpacity>
        </View>
        
        {user.courses.map((course) => (
          <TouchableOpacity 
            key={course.id}
            className={`${colors.card} p-4 rounded-2xl shadow-sm mb-4 flex-row items-center`}
            activeOpacity={0.95}
          >
            <View className="bg-indigo-100 w-12 h-12 rounded-xl items-center justify-center mr-4">
              <Ionicons name={course.icon as any} size={24} color="#4F46E5" />
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between items-center mb-1">
                <Text className="font-bold text-gray-800">{course.title}</Text>
                <Text className="text-gray-500 text-xs">{course.timeEstimate}</Text>
              </View>
              <View className="h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
                <View
                  className="h-full bg-gradient-to-r from-indigo-500 to-teal-400 rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-500 text-xs">Next: {course.nextLesson}</Text>
                <Text className="text-indigo-600 text-xs">{course.progress}%</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Interactive Recommendation Tabs */}
      <View className="px-6 mb-4">
        <View className="flex-row border-b border-gray-200 mb-4">
          {['Recommended', 'Popular', 'New'].map((tab) => (
            <TouchableOpacity
              key={tab}
              className={`pb-2 px-4 mr-4 ${activeButton === tab.toLowerCase() ? 'border-b-2 border-indigo-600' : ''}`}
              onPress={() => setActiveButton(tab.toLowerCase())}
              activeOpacity={0.7}
            >
              <Text 
                className={`font-medium ${activeButton === tab.toLowerCase() ? 'text-indigo-600' : 'text-gray-500'}`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="pb-4"
        >
          {user.recommendations.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="bg-white w-64 p-4 rounded-2xl shadow-sm mr-4"
              activeOpacity={0.95}
            >
              <View className="flex-row items-center mb-3">
                <View className="bg-indigo-100 w-10 h-10 rounded-full items-center justify-center mr-3">
                  <Ionicons name={item.icon as any} size={18} color="#4F46E5" />
                </View>
                <Text className="font-bold text-gray-800 flex-1">{item.title}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-500 text-sm">{item.duration}</Text>
                <View className="bg-indigo-100 w-8 h-8 rounded-full items-center justify-center">
                  <Ionicons name="chevron-forward" size={16} color="#4F46E5" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>


    </ScrollView>
  );
};

export default Dashboard;