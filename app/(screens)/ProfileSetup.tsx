// src/screens/ProfileSetupScreen.tsx
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ProfileSetupScreen = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(30)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    // You can handle saving the name and avatar here
    setTimeout(() => {
      setLoading(false);
      alert('Profile saved!');
      navigation.navigate('(screens)/PathSelection');
    }, 1000);
  };

  const isFormComplete = name && avatar;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-900"
    >
        <View className="items-center mt-8 mb-6">
    <Text className="text-4xl font-extrabold text-amber-400 tracking-widest">DtudyFlow</Text>
    <Text className="text-xs text-violet-300 mt-1">Your learning app</Text>
  </View>
      {/* Floating orb elements */}
      <Animated.View 
        className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-purple-500/20"
        style={{ 
          transform: [
            { translateX: -50 },
            { translateY: -50 },
          ]
        }}
      />
      <Animated.View 
        className="absolute top-2/3 right-1/4 w-32 h-32 rounded-full bg-amber-400/20"
        style={{ 
          transform: [
            { translateX: 40 },
            { translateY: -40 },
          ]
        }}
      />

      <View className="flex-1 px-6 pt-10 pb-6">
        {/* Header */}
        <Animated.View 
          className="mb-8"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }]
          }}
        >
          <View className="flex-row items-center">
            <Ionicons name="person-circle" size={32} color="#A78BFA" />
            <Text className="text-3xl font-bold text-white ml-3">Complete Your Profile</Text>
          </View>
          <Text className="text-violet-300 mt-4">Add your name and profile photo</Text>
        </Animated.View>

        {/* Profile Picture */}
        <Animated.View 
          className="items-center mb-8"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }]
          }}
        >
          <TouchableOpacity onPress={pickImage}>
            <View className="w-32 h-32 rounded-full bg-gray-800 border-2 border-dashed border-purple-500/50 items-center justify-center overflow-hidden mt-4">
              {avatar ? (
                <Image source={{ uri: avatar }} className="w-full h-full rounded-full" />
              ) : (
                <View className="items-center">
                  <Ionicons name="camera" size={32} color="#A78BFA" />
                  <Text className="text-violet-300 mt-2 text-center">Add Photo</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Name Input */}
        <Animated.View 
          className="mb-4"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }]
          }}
        >
          <Text className="text-sm font-medium text-violet-200 mb-1 mt-5">Full Name</Text>
          <TextInput
            className="h-12 px-4 rounded-lg bg-gray-800 text-white border border-gray-700"
            placeholder="Your name"
            placeholderTextColor="#9CA3AF"
            value={name}
            onChangeText={setName}
          />
        </Animated.View>

        {/* Submit Button */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }]
          }}
        >
          <TouchableOpacity
            className={`mt-5 h-14 rounded-xl justify-center items-center ${
              loading ? 'bg-amber-500/80' : 
              !isFormComplete ? 'bg-gray-700' : 'bg-gradient-to-r from-amber-400 to-amber-500'
            }`}
            onPress={handleSubmit}
            disabled={loading || !isFormComplete}
            activeOpacity={0.9}
          >
            {loading ? (
              <View className="flex-row items-center">
                <View className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                <Text className="text-gray-900 font-bold">Saving...</Text>
              </View>
            ) : (
              <Text className="text-gray-900 font-bold">Save Profile</Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Decorative bottom element */}
      <Animated.View 
        className="absolute bottom-0 w-full h-16 bg-gradient-to-r from-indigo-600/30 to-amber-500/30"
        style={{ 
          transform: [
            { translateY: slideUpAnim },
            { skewY: '-3deg' }
          ]
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default ProfileSetupScreen;