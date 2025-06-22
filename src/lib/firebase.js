import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBaJotG3oOtxzC7NE7L_CvJtlVL49VPcUs",
  authDomain: "news-dashboard-9f342.firebaseapp.com",
  projectId: "news-dashboard-9f342",
  storageBucket: "news-dashboard-9f342.appspot.com", // Corrected storage bucket format
  messagingSenderId: "1046617484875",
  appId: "1:1046617484875:web:674760f285f50981a6e7ce",
  measurementId: "G-BWVC9VTV9P"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, GoogleAuthProvider, signInWithPopup };
