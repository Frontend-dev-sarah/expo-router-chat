// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: Constants.expoConfig?.extra?.apiKey,
    authDomain: Constants.expoConfig?.extra?.authDomain,
    projectId: Constants.expoConfig?.extra?.projectId,
    storageBucket: Constants.expoConfig?.extra?.storageBucket,
    messagingSenderId: Constants.expoConfig?.extra?.messagingSenderId,
    appId: Constants.expoConfig?.extra?.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize Firebase Auth for that app immediately
initializeAuth(app);

export const auth = getAuth();
export const database = getFirestore();