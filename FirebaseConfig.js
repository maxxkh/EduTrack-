// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, indexedDBLocalPersistence  } from "firebase/auth"; // initializeAuth comes from firebase/auth
// import { getReactNativePersistence } from "firebase/auth/react-native"; // <-- THIS IS THE CRUCIAL CHANGE!
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL1m2bOBU6ZcAlyXClwn8iODAAHutAsJw",
  authDomain: "expo-study-guide-app.firebaseapp.com",
  projectId: "expo-study-guide-app",
  storageBucket: "expo-study-guide-app.firebasestorage.app",
  messagingSenderId: "400351147468",
  appId: "1:400351147468:web:dcdc458f8c561ac9519969"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence using AsyncStorage for React Native
const auth = initializeAuth(app, {
  persistence: indexedDBLocalPersistence 
});
// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };