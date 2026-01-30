// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl-0VfZLowaQ6eSwOQKUSQ7oSAKmm79oM",
  authDomain: "agendaturnos-27e41.firebaseapp.com",
  projectId: "agendaturnos-27e41",
  storageBucket: "agendaturnos-27e41.firebasestorage.app",
  messagingSenderId: "886636705856",
  appId: "1:886636705856:web:81ef8684359a5e858fc7a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);