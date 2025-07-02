// // src/screens/CreateAccountScreen.tsx
// import React from 'react';
// import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
// import { useCreateAccount } from '../hooks/useCreateAccount';
// import { useNavigation } from '@react-navigation/native';

// const CreateAccountScreen = () => {
//   const navigation = useNavigation<any>();
//   const {
//     email,
//     password,
//     confirmPassword,
//     isLoading,
//     showPassword,
//     focusedField,
//     errors,
//     isFormValid,
//     setShowPassword,
//     setFocusedField,
//     validateEmail,
//     validatePassword,
//     validateConfirmPassword,
//     handleSignUp
//   } = useCreateAccount();

//   return (
//     <KeyboardAvoidingView 
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       className="flex-1 bg-gray-50"
//     >
//       <View className="flex-1 justify-center px-8">
//         {/* Header */}
//         <View className="mb-8">
//           <Text className="text-3xl font-bold text-gray-900">Create Account</Text>
//           <Text className="text-gray-500 mt-2">Start your learning journey</Text>
//         </View>

//         {/* Email Input */}
//         <View className="mb-4">
//           <Text className="text-sm font-medium text-gray-700 mb-1">Email</Text>
//           <TextInput
//             className={`h-12 px-4 border rounded-lg ${
//               focusedField === 'email' 
//                 ? 'border-purple-500 bg-purple-50' 
//                 : errors.email 
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
//           {errors.email ? (
//             <Text className="text-red-500 text-xs mt-1">{errors.email}</Text>
//           ) : null}
//         </View>

//         {/* Password Input */}
//         <View className="mb-4">
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
//               focusedField === 'password' 
//                 ? 'border-purple-500 bg-purple-50' 
//                 : errors.password 
//                   ? 'border-red-500 bg-red-50' 
//                   : 'border-gray-300'
//             }`}
//             placeholder="Create a password"
//             secureTextEntry={!showPassword}
//             value={password}
//             onChangeText={validatePassword}
//             onFocus={() => setFocusedField('password')}
//             onBlur={() => setFocusedField(null)}
//           />
//           {errors.password ? (
//             <Text className="text-red-500 text-xs mt-1">{errors.password}</Text>
//           ) : null}
//         </View>

//         {/* Confirm Password Input */}
//         <View className="mb-8">
//           <Text className="text-sm font-medium text-gray-700 mb-1">Confirm Password</Text>
//           <TextInput
//             className={`h-12 px-4 border rounded-lg ${
//               focusedField === 'confirmPassword' 
//                 ? 'border-purple-500 bg-purple-50' 
//                 : errors.confirmPassword 
//                   ? 'border-red-500 bg-red-50' 
//                   : 'border-gray-300'
//             }`}
//             placeholder="Re-enter your password"
//             secureTextEntry={!showPassword}
//             value={confirmPassword}
//             onChangeText={validateConfirmPassword}
//             onFocus={() => setFocusedField('confirmPassword')}
//             onBlur={() => setFocusedField(null)}
//           />
//           {errors.confirmPassword ? (
//             <Text className="text-red-500 text-xs mt-1">{errors.confirmPassword}</Text>
//           ) : null}
//         </View>

//         {/* Sign Up Button */}
//         <TouchableOpacity
//           className={`h-14 rounded-lg justify-center items-center ${
//             isLoading ? 'bg-purple-400' : 
//             !isFormValid ? 'bg-purple-300' : 'bg-purple-600'
//           }`}
//           onPress={handleSignUp}
//           disabled={isLoading || !isFormValid}
//           activeOpacity={0.9}
//         >
//           {isLoading ? (
//             <View className="flex-row items-center">
//               <View className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
//               <Text className="text-white font-medium">Creating account...</Text>
//             </View>
//           ) : (
//             <Text className="text-white font-medium">Sign Up</Text>
//           )}
//         </TouchableOpacity>

//         {/* Footer Links */}
//         <View className="flex-row justify-center mt-6">
//           <Text className="text-gray-500">Already have an account?</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('(screens)/Login')}>
//             <Text className="text-purple-600 font-medium ml-2">Sign In</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default CreateAccountScreen;



import React from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Animated, Easing, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCreateAccount } from '../hooks/useCreateAccount';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const CreateAccountScreen = () => {
  const navigation = useNavigation<any>();
  const {
    email,
    password,
    confirmPassword,
    isLoading,
    showPassword,
    focusedField,
    errors,
    isFormValid,
    setShowPassword,
    setFocusedField,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    handleSignUp
  } = useCreateAccount();

  // Animation values
  const slideUpAnim = React.useRef(new Animated.Value(50)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.exp),
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
        className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-purple-500/20"
        style={{ 
          transform: [
            { translateX: -50 },
            { translateY: -50 },
          ]
        }}
      />
      <Animated.View 
        className="absolute top-2/3 left-3/4 w-32 h-32 rounded-full bg-amber-400/20"
        style={{ 
          transform: [
            { translateX: -40 },
            { translateY: -40 },
          ]
        }}
      />

      <View className="flex-1 justify-center px-8">
        {/* Header */}
        <Animated.View 
          className="mb-8"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }]
          }}
        >
          <View className="flex-row items-center mb-4">
            <Ionicons name="person-add" size={32} color="#A78BFA" />
            <Text className="text-3xl font-bold text-white ml-3">Create Account</Text>
          </View>
          <Text className="text-violet-300">Join our learning community</Text>
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
                : errors.email 
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
          {errors.email ? (
            <Text className="text-red-400 text-xs mt-1">{errors.email}</Text>
          ) : null}
        </Animated.View>

        {/* Password Input */}
        <Animated.View 
          className="mb-4"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }]
          }}
        >
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-sm font-medium text-violet-200">Password</Text>
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
                : errors.password 
                  ? 'border-2 border-red-500' 
                  : 'border border-gray-700'
            }`}
            placeholder="Create a password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={validatePassword}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
          />
          {errors.password ? (
            <Text className="text-red-400 text-xs mt-1">{errors.password}</Text>
          ) : null}
        </Animated.View>

        {/* Confirm Password Input */}
        <Animated.View 
          className="mb-8"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }]
          }}
        >
          <Text className="text-sm font-medium text-violet-200 mb-1">Confirm Password</Text>
          <TextInput
            className={`h-12 px-4 rounded-lg bg-gray-800 text-white ${
              focusedField === 'confirmPassword' 
                ? 'border-2 border-purple-500' 
                : errors.confirmPassword 
                  ? 'border-2 border-red-500' 
                  : 'border border-gray-700'
            }`}
            placeholder="Re-enter your password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={validateConfirmPassword}
            onFocus={() => setFocusedField('confirmPassword')}
            onBlur={() => setFocusedField(null)}
          />
          {errors.confirmPassword ? (
            <Text className="text-red-400 text-xs mt-1">{errors.confirmPassword}</Text>
          ) : null}
        </Animated.View>

        {/* Sign Up Button */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }]
          }}
        >
          <TouchableOpacity
            className={`py-4 mt-5 rounded-xl justify-center items-center ${
              isLoading ? 'bg-amber-500/80' : 
              !isFormValid ? 'bg-gray-700' : 'bg-gradient-to-r from-amber-400 to-amber-500'
            }`}
            onPress={handleSignUp}
            disabled={isLoading || !isFormValid}
            activeOpacity={0.9}
          >
            {isLoading ? (
              <View className="flex-row items-center">
                <View className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                <Text className="text-gray-900 font-bold">Creating account...</Text>
              </View>
            ) : (
              <Text className="text-gray-900 font-bold">Sign Up</Text>
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
          <Text className="text-gray-400 mt-4">Already have an account?</Text>
          <TouchableOpacity className="ml-2" onPress={() => navigation.navigate('(screens)/Login')}>
            <Text className="text-amber-400 font-medium mt-1">Sign In</Text>
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

export default CreateAccountScreen;