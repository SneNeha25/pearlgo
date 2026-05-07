// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGQ-yjj7gqcoPgTcxUTpJVGN7Py85ZmeU",
  authDomain: "pearlgo-65bda.firebaseapp.com",
  databaseURL: "https://pearlgo-65bda-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pearlgo-65bda",
  storageBucket: "pearlgo-65bda.firebasestorage.app",
  messagingSenderId: "695556238093",
  appId: "1:695556238093:web:02a0b778cb8626fef89e44",
  measurementId: "G-07F5D8SM8M"
};

// Initialize Firebase (ensure we don't re-initialize on hot reloads in Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Get a reference to the Realtime Database service
export const db = getDatabase(app);

// Get a reference to the Auth service
export const auth = getAuth(app);
