// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCI5YcjYf5qw68f_u1yc_J56-eXPIdwi3Q",
  authDomain: "hackathoncsi-9dc45.firebaseapp.com",
  projectId: "hackathoncsi-9dc45",
  storageBucket: "hackathoncsi-9dc45.firebasestorage.app",
  messagingSenderId: "414781335628",
  appId: "1:414781335628:web:ababd11482442b6b216ce9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);