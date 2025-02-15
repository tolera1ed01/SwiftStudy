// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT6W4ShUZSAeVhXpBHrj20j6O-H4Sq40E",
  authDomain: "swiftstudy-4a908.firebaseapp.com",
  projectId: "swiftstudy-4a908",
  storageBucket: "swiftstudy-4a908.firebasestorage.app",
  messagingSenderId: "72070872470",
  appId: "1:72070872470:web:9500c7f47e7fce8ab4b1b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);


const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth, db };