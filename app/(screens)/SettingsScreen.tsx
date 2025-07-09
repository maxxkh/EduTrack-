import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Switch, TextInput, Alert } from 'react-native';
import { MaterialIcons, Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../../FirebaseConfig';

const SettingsScreen = () => {
  const navigation = useNavigation<any>();
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    profileImage: require('../../assets/image.png'),
    isDarkMode: false,
    notificationsEnabled: true,
  });

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(user.name);
  

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need access to your photos to change your profile picture');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setUser({...user, profileImage: { uri: result.assets[0].uri }});
    }
  };

  // Save name handler
  const handleSaveName = () => {
    if (tempName.trim().length < 2) {
      Alert.alert('Invalid name', 'Please enter a valid name');
      return;
    }
    setUser({...user, name: tempName});
    setIsEditingName(false);
  };



    const HandleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      navigation.navigate('(screens)/Login');
    } catch (error: any) {
      console.error('Sign out error:', error.message);
      Alert.alert(
        'Sign Out Failed',
        error.message || 'Unable to sign out at this time'
      );
    }
  };

  return (
    <View className={`flex-1 ${user.isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <View className={`px-6 pt-12 pb-4 ${user.isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity onPress={() => navigation?.goBack && navigation.goBack()}>
            <MaterialIcons 
              name="arrow-back" 
              size={24} 
              color={user.isDarkMode ? '#FFFFFF' : '#4F46E5'} 
            />
          </TouchableOpacity>
          <Text className={`text-xl font-bold ${user.isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Account Settings
          </Text>
          <View style={{ width: 24 }} /> 
        </View>

        {/* Profile Section */}
        <View className="items-center mb-6">
          <TouchableOpacity onPress={handleImagePick}>
            <View className="relative">
              <Image 
                source={user.profileImage} 
                className="w-24 h-24 rounded-full"
              />
              <View className="absolute bottom-0 right-0 bg-indigo-500 p-2 rounded-full">
                <Feather name="camera" size={16} color="white" />
              </View>
            </View>
          </TouchableOpacity>

          {isEditingName ? (
            <View className="flex-row items-center mt-4">
              <TextInput
                value={tempName}
                onChangeText={setTempName}
                className={`flex-1 border-b ${user.isDarkMode ? 'border-gray-600 text-white' : 'border-gray-300 text-gray-900'} py-2 px-1`}
                autoFocus
                maxLength={30}
              />
              <TouchableOpacity onPress={handleSaveName} className="ml-2">
                <Ionicons 
                  name="checkmark-circle" 
                  size={28} 
                  color="#10B981" 
                />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {
                  setIsEditingName(false);
                  setTempName(user.name);
                }} 
                className="ml-1"
              >
                <Ionicons 
                  name="close-circle" 
                  size={28} 
                  color="#EF4444" 
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View className="items-center mt-4">
              <Text className={`text-xl font-bold ${user.isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {user.name}
              </Text>
              <TouchableOpacity 
                onPress={() => setIsEditingName(true)}
                className="flex-row items-center mt-1"
              >
                <Text className={`text-sm ${user.isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Edit profile
                </Text>
                <MaterialIcons 
                  name="edit" 
                  size={16} 
                  color={user.isDarkMode ? '#9CA3AF' : '#6B7280'} 
                  className="ml-1"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Settings Options */}
      <ScrollView 
        className="flex-1 px-6 pt-4" 
        showsVerticalScrollIndicator={false}
      >
        {/* Account Section */}
        <View className={`rounded-xl overflow-hidden mb-6 ${user.isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <Text className={`font-medium px-4 pt-4 pb-2 ${user.isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            ACCOUNT
          </Text>
          
          <TouchableOpacity 
            className={`flex-row items-center justify-between px-4 py-3 ${user.isDarkMode ? 'border-gray-700' : 'border-gray-100'} border-t`}
          >
            <View className="flex-row items-center">
              <MaterialIcons 
                name="email" 
                size={20} 
                color={user.isDarkMode ? '#9CA3AF' : '#6B7280'} 
                className="mr-3"
              />
              <View>
                <Text className={`font-medium ${user.isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Email
                </Text>
                <Text className={`text-sm ${user.isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {user.email}
                </Text>
              </View>
            </View>
            <Feather 
              name="chevron-right" 
              size={20} 
              color={user.isDarkMode ? '#6B7280' : '#9CA3AF'} 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            className={`flex-row items-center justify-between px-4 py-3 ${user.isDarkMode ? 'border-gray-700' : 'border-gray-100'} border-t`}
          >
            <View className="flex-row items-center">
              <MaterialIcons 
                name="lock" 
                size={20} 
                color={user.isDarkMode ? '#9CA3AF' : '#6B7280'} 
                className="mr-3"
              />
              <Text className={`font-medium ${user.isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Password
              </Text>
            </View>
            <Feather 
              name="chevron-right" 
              size={20} 
              color={user.isDarkMode ? '#6B7280' : '#9CA3AF'} 
            />
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <View className={`rounded-xl overflow-hidden mb-6 ${user.isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <Text className={`font-medium px-4 pt-4 pb-2 ${user.isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            PREFERENCES
          </Text>
          
          <View className={`flex-row items-center justify-between px-4 py-3 ${user.isDarkMode ? 'border-gray-700' : 'border-gray-100'} border-t`}>
            <View className="flex-row items-center">
              <MaterialIcons 
                name="dark-mode" 
                size={20} 
                color={user.isDarkMode ? '#9CA3AF' : '#6B7280'} 
                className="mr-3"
              />
              <Text className={`font-medium ${user.isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Dark Mode
              </Text>
            </View>
            <Switch
              value={user.isDarkMode}
              onValueChange={(value) => setUser({...user, isDarkMode: value})}
              trackColor={{ false: '#E5E7EB', true: '#4F46E5' }}
              thumbColor="#FFFFFF"
            />
          </View> 
        </View>

     
        {/* Sign Out Button */}
        <TouchableOpacity 
          className={`flex-row items-center justify-center py-4 rounded-xl mb-8 ${user.isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          onPress={HandleSignOut}
        >
          <MaterialIcons 
            name="logout" 
            size={20} 
            color="#EF4444" 
            className="mr-2"
          />
          <Text className="text-red-500 font-medium">
            Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;