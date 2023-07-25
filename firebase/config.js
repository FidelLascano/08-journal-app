import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDkVhWnhc2XA5WcGto2pWc3DD1tQp_T_TQ",
    authDomain: "react-courses-37f1d.firebaseapp.com",
    projectId: "react-courses-37f1d",
    storageBucket: "react-courses-37f1d.appspot.com",
    messagingSenderId: "24983484093",
    appId: "1:24983484093:web:6a6c86f60926791452e9d4"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);