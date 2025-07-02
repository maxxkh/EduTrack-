// // src/screens/LoginScreen.tsx
// import React from 'react';
// import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
// import { useLogin } from '../hooks/useLogin';
// import { useNavigation } from '@react-navigation/native';

// const LoginScreen = () => {
//   const navigation = useNavigation<any>();
//   const {
//     email,
//     password,
//     isLoading,
//     showPassword,
//     focusedField,
//     emailError,
//     setPassword,
//     setShowPassword,
//     setFocusedField,
//     validateEmail,
//     handleLogin
//   } = useLogin();

//   return (
//     <KeyboardAvoidingView 
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       className="flex-1 bg-gray-50"
//     >
//       <View className="flex-1 justify-center px-8">
//         {/* Header */}
//         <View className="mb-12">
//           <Text className="text-3xl font-bold text-gray-900">Welcome back</Text>
//           <Text className="text-gray-500 mt-2">Sign in to continue your learning</Text>
//         </View>

//         {/* Email Input */}
//         <View className="mb-4">
//           <Text className="text-sm font-medium text-gray-700 mb-1">Email</Text>
//           <TextInput
//             className={`h-12 px-4 border rounded-lg ${
//               focusedField === 'email' 
//                 ? 'border-purple-500 bg-purple-50' 
//                 : emailError 
//                   ? 'border-red-500 bg-red-50' 
//                   : 'border-gray-300'
//             }`}
//             placeholder="Enter your email"
//             keyboardType="email-address"
//             autoCapitalize="none"
//             value={email}
//             onChangeText={validateEmail}
//             onFocus={() => setFocusedField('email')}
//             onBlur={() => setFocusedField(null)}
//           />
//           {emailError ? (
//             <Text className="text-red-500 text-xs mt-1">{emailError}</Text>
//           ) : null}
//         </View>

//         {/* Password Input */}
//         <View className="mb-8">
//           <View className="flex-row justify-between items-center mb-1">
//             <Text className="text-sm font-medium text-gray-700">Password</Text>
//             <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//               <Text className="text-purple-600 text-sm font-medium">
//                 {showPassword ? 'Hide' : 'Show'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <TextInput
//             className={`h-12 px-4 border rounded-lg ${
//               focusedField === 'password' ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
//             }`}
//             placeholder="Enter your password"
//             secureTextEntry={!showPassword}
//             value={password}
//             onChangeText={setPassword}
//             onFocus={() => setFocusedField('password')}
//             onBlur={() => setFocusedField(null)}
//           />
//         </View>

//         {/* Login Button */}
//         <TouchableOpacity
//           className={`h-14 rounded-lg justify-center items-center ${
//             isLoading ? 'bg-purple-400' : 
//             emailError || !email ? 'bg-purple-300' : 'bg-purple-600'
//           }`}
//           onPress={handleLogin}
//           disabled={isLoading || !!emailError || !email || !password}
//           activeOpacity={0.9}
//         >
//           {isLoading ? (
//             <View className="flex-row items-center">
//               <View className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
//               <Text className="text-white font-medium">Signing in...</Text>
//             </View>
//           ) : (
//             <Text className="text-white font-medium">Sign In</Text>
//           )}
//         </TouchableOpacity>

//         {/* Footer Links */}
//         <View className="flex-row justify-center mt-6">
//           <TouchableOpacity>
//             <Text className="text-purple-600 font-medium">Forgot password?</Text>
//           </TouchableOpacity>
//           <Text className="mx-2 text-gray-400">|</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('(screens)/SignUp')}>
//             <Text className="text-purple-600 font-medium">Create account</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default LoginScreen;



// src/screens/LoginScreen.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLogin } from '../hooks/useLogin';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const {
    email,
    password,
    isLoading,
    showPassword,
    focusedField,
    emailError,
    setPassword,
    setShowPassword,
    setFocusedField,
    validateEmail,
    handleLogin
  } = useLogin();

  // Animation values
  const slideUpAnim = React.useRef(new Animated.Value(50)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-900"
    >
      {/* Floating orb elements */}
      <Animated.View 
        className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-purple-500/20"
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

      <View className="flex-1 justify-center px-8">
        {/* Header */}
        <Animated.View 
          className="mb-12"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }]
          }}
        >
          <View className="flex-row items-center mb-4">
            <Ionicons name="log-in" size={32} color="#A78BFA" />
            <Text className="text-3xl font-bold text-white ml-3">Welcome Back</Text>
          </View>
          <Text className="text-violet-300 mb-4">Continue your learning journey</Text>
        </Animated.View>

        {/* Email Input */}
        <Animated.View 
          className="mb-4"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }]
          }}
        >
          <Text className="text-sm font-medium text-violet-200 mb-1">Email</Text>
          <TextInput
            className={`h-12 px-4 rounded-lg bg-gray-800 text-white ${
              focusedField === 'email' 
                ? 'border-2 border-purple-500' 
                : emailError 
                  ? 'border-2 border-red-500' 
                  : 'border border-gray-700'
            }`}
            placeholder="Enter your email"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={validateEmail}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
          />
          {emailError ? (
            <Text className="text-red-400 text-xs mt-1">{emailError}</Text>
          ) : null}
        </Animated.View>

        {/* Password Input */}
        <Animated.View 
          className="mb-8"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }]
          }}
        >
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-sm font-medium text-violet-200 mt-2 ">Password</Text>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text className="text-amber-400 text-sm font-medium">
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            className={`h-12 px-4 rounded-lg bg-gray-800 text-white ${
              focusedField === 'password' 
                ? 'border-2 border-purple-500' 
                : 'border border-gray-700'
            }`}
            placeholder="Enter your password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
          />
        </Animated.View>

        {/* Login Button */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }]
          }}
        >
          <TouchableOpacity
            className={`py-4 mt-4 rounded-xl justify-center items-center ${
              isLoading ? 'bg-amber-500/80' : 
              emailError || !email || !password ? 'bg-gray-700' : 'bg-gradient-to-r from-amber-400 to-amber-500'
            }`}
            onPress={handleLogin}
            disabled={isLoading || !!emailError || !email || !password}
            activeOpacity={0.9}
          >
            {isLoading ? (
              <View className="flex-row items-center">
                <View className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                <Text className="text-gray-900 font-bold">Signing in...</Text>
              </View>
            ) : (
              <Text className="text-gray-900 font-bold">Sign In</Text>
            )}
          </TouchableOpacity>
        </Animated.View>

        {/* Footer Links */}
        <Animated.View 
          className="flex-row justify-center mt-6"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }]
          }}
        >
          <TouchableOpacity
           onPress={() => navigation.navigate('(screens)/ForgotPassword')}>
            <Text className="text-amber-400 font-medium mt-2 mb-2">Forgot password?</Text>
          </TouchableOpacity>
          <Text className=" text-gray-400"></Text>
          <TouchableOpacity onPress={() => navigation.navigate('(screens)/SignUp')}>
            <Text className="text-indigo-400 font-medium ">Create account</Text>
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

export default LoginScreen;