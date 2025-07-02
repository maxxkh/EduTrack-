

import "./globals.css";
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Index = () => {
  const navigation = useNavigation<any>();
  const slideUpAnim = new Animated.Value(100);
  const fadeAnim = new Animated.Value(0);
  const rotateAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 15000,
            easing: Easing.linear,
            useNativeDriver: true
          })
        ])
      )
    ]).start();
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View className="flex-1 bg-gray-900">
      {/* Floating orb elements */}
      <Animated.View 
        className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-purple-500/20"
        style={{ 
          transform: [
            { translateX: -50 },
            { translateY: -50 },
            { rotate: rotateInterpolate }
          ]
        }}
      />
      <Animated.View 
        className="absolute top-2/3 left-3/4 w-32 h-32 rounded-full bg-amber-400/20"
        style={{ 
          transform: [
            { translateX: -40 },
            { translateY: -40 },
            { rotate: rotateInterpolate }
          ]
        }}
      />
      
      {/* Main content container */}
      <View className="flex-1 px-8 pt-24 pb-12">
        {/* Asymmetric header */}
        <View className="mb-16">
          <Animated.View 
            className="self-start mb-6 p-4 bg-indigo-600 rounded-xl"
            style={{ 
              opacity: fadeAnim,
              transform: [{ 
                translateY: slideUpAnim
              }]
            }}
          >
            <Ionicons name="rocket" size={40} color="#fff" />
          </Animated.View>
          
          <Animated.View 
            style={{ 
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }]
            }}
          >
            <Text className="text-5xl font-bold text-white leading-tight">
              Transform <Text className="text-amber-400">Your</Text>
            </Text>
            <Text className="text-5xl font-bold text-white">
              Learning <Text className="text-indigo-400">Journey</Text>
            </Text>
          </Animated.View>
        </View>

        {/* Diagonal feature cards */}
        <Animated.View 
          className="mb-12"
          style={{ 
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }]
          }}
        >
          <View className="flex-row mb-6">
            <View className="bg-white/5 p-5 rounded-2xl w-[65%] border-l-4 border-amber-400">
              <Ionicons name="ribbon" size={28} color="#A78BFA" className="mb-2" />
              <Text className="text-white font-bold text-lg mb-1">Folow Our Path</Text>
              <Text className="text-violet-300 text-sm">Get expert </Text>
            </View>
            <View className="w-[35%] justify-end pl-4">
              <Text className="text-6xl text-amber-400 font-light">01</Text>
            </View>
          </View>

          <View className="flex-row justify-end">
            <View className="w-[35%] justify-start pr-4 items-end">
              <Text className="text-6xl text-indigo-400 font-light">02</Text>
            </View>
            <View className="bg-white/5 p-5 rounded-2xl w-[65%] border-r-4 border-indigo-400">
              <Ionicons name="people" size={28} color="#FBBF24" className="mb-2" />
              <Text className="text-white font-bold text-lg mb-1">monitor your Progresss</Text>
              <Text className="text-amber-300 text-sm">Industry professionals</Text>
            </View>
          </View>
        </Animated.View>

        {/* CTA Section */}
        <Animated.View 
          style={{ 
            transform: [{ translateY: slideUpAnim }],
            opacity: fadeAnim
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('(screens)/SignUp')}
            className="bg-gradient-to-r from-amber-400 to-amber-500 py-4 rounded-xl items-center mb-4 mt-10 flex-row justify-center"
            activeOpacity={0.9}
          >
            <Text className="text-gray-900 font-bold text-lg">
              Start Learning Free
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#1F2937" className="ml-2" />
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
    </View>
  );
};

export default Index;