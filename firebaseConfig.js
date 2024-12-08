import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDhE0QXyoWJAPGsfkw7Oi2s2YnZDlb3fQ", // Web API Key
  authDomain: "urovisionauthentication-30713.firebaseapp.com", // Auth Domain
  projectId: "urovisionauthentication-30713", // Project ID
  storageBucket: "urovisionauthentication-30713.appspot.com", // Storage Bucket
  messagingSenderId: "245942599846", // Messaging Sender ID
  appId: "1:245942599846:android:2f89cd9dbe58f183247467", // App ID
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Use `initializeAuth` for React Native Persistence
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  // If already initialized, fallback to `getAuth`
  auth = getAuth(app);
}

// Initialize Firestore
const db = getFirestore(app);

// Export the app, auth, and db instances
export { app, auth, db };
