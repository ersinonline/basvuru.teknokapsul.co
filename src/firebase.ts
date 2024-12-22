import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBUTqMQPaWvSEYq-kVR198Zgvp_ZZUX3So",
  authDomain: "superapp-37db4.firebaseapp.com",
  projectId: "superapp-37db4",
  storageBucket: "superapp-37db4.appspot.com",
  messagingSenderId: "488411585201",
  appId: "1:488411585201:web:51a3138f763f1842156090",
  measurementId: "G-SJY3Z4VDPE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);