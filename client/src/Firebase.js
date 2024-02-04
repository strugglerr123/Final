// import React from "react";
import env from "react-dotenv"
// import path from "path"
// import dotenv from "dotenv"


import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// dotenv.config();
const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: "firstproject-21bec090.firebaseapp.com",
  projectId: "firstproject-21bec090",
  storageBucket: "firstproject-21bec090.appspot.com",
  messagingSenderId: "957103533889",
  appId: "1:957103533889:web:bfda14b04d8ad2499bfbc0",
  measurementId: "G-19P8V3J8P0",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
