import { signOut } from "firebase/auth";
import { Alert } from "react-native";
import { auth } from "../../FirebaseConfig";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  index: undefined;
  
};

export default function useHandleSignOut() {
    
    const handleSignOut = async () => {
      const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      navigation.navigate('index');
    } catch (error: any) {
      console.error('Sign out error:', error.message);
      Alert.alert(
        'Sign Out Failed',
        error.message || 'Unable to sign out at this time'
      );
    }
  };

  return handleSignOut;
}
