
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBQsHsJQgT2UiqSxCE6h1vT9koTX9zTVEU",
  authDomain: "starwars-firebase-auth.firebaseapp.com",
  projectId: "starwars-firebase-auth",
  storageBucket: "starwars-firebase-auth.firebasestorage.app",
  messagingSenderId: "1041454265434",
  appId: "1:1041454265434:web:5333fdb0e7bbacf2b1d463"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
