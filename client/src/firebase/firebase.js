    // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVE-nxzVXMVpPma1J3_0SRgvlLunTPpfc",
  authDomain: "bookwellcare-3568b.firebaseapp.com",
  projectId: "bookwellcare-3568b",
  storageBucket: "bookwellcare-3568b.appspot.com",
  messagingSenderId: "551720181517",
  appId: "1:551720181517:web:31704e7d16d1ee6f1f5a44",
  measurementId: "G-GQ9W4TVQ6X"
};


// Initialize Firebase
const firebaseAuth = initializeApp(firebaseConfig);
const  auth = getAuth(firebaseAuth)

export default auth;