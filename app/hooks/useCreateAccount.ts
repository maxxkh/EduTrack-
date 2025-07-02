// src/hooks/useCreateAccount.ts
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword ,getAuth,onAuthStateChanged, User } from 'firebase/auth';

export const useCreateAccount = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validateEmail = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (text.length === 0) {
      setErrors(prev => ({ ...prev, email: '' }));
    } else if (!emailRegex.test(text)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const validatePassword = (text: string) => {
    setPassword(text);
    
    if (text.length === 0) {
      setErrors(prev => ({ ...prev, password: '' }));
    } else if (text.length < 6) {
      setErrors(prev => ({ ...prev, password: 'Minimum 6 characters' }));
    } else {
      setErrors(prev => ({ ...prev, password: '' }));
    }
    
    // Re-validate confirm password
    if (confirmPassword && text !== confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    } else if (confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  };

  const validateConfirmPassword = (text: string) => {
    setConfirmPassword(text);
    
    if (text.length === 0) {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    } else if (text !== password) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    } else {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  };



useEffect(() => {
  const auth = getAuth(); // Get your auth instance

  const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      // User is signed in.
      console.log("User is signed in:", user.email);
      navigation.navigate('(screens)/Dashboard'); // Navigate to the dashboard or home screen

      // You can update your UI here, navigate, or fetch user-specific data.
      // For example: setLoggedInUser(user);
    } else {
      // No user is signed in.
      console.log("No user is signed in.");
      navigation.navigate('(screens)/SignUp');
      // You might redirect to a login page or show a public view.
      // For example: setLoggedInUser(null);
    }
  });

  return () => unsubscribe();
}, []);






const handleSignUp = async () => {
  if (!email || !password || !confirmPassword) {
    alert('Please fill in all fields.');
    return;
  }
  if (errors.email || errors.password || errors.confirmPassword) {
    alert('Please fix the errors in the form.');
    return;
  }

  setIsLoading(true);
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Pass the UID to the ProfileSetup screen
    navigation.navigate('(screens)/ProfileSetup', { uid: userCredential.user.uid });
  } catch (error: any) {
    console.log(error);
    alert('Error creating account: ' + error.message);
  } finally {
    setIsLoading(false);
  }
};

  const isFormValid = !errors.email && !errors.password && !errors.confirmPassword && 
                     email && password && confirmPassword;

  return {
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
  };
};