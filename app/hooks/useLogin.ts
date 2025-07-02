// src/hooks/useLogin.ts
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../FirebaseConfig';

export const useLogin = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (text.length === 0) {
      setEmailError('');
    } else if (!emailRegex.test(text)) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  };

  const handleLogin = async () => {
    if (emailError || !email || !password) {
      return;
    }

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('(screens)/Dashboard');
    } catch (error: any) {
      console.log(error);
      alert('Login failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
};