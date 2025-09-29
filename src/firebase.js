import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";




const firebaseConfig = {
  apiKey: "AIzaSyByh0vBgqwKtf0DNKRexEQ9xsIK0G3C1-Y",
  authDomain: "h-cases.firebaseapp.com",
  projectId: "h-cases",
  storageBucket: "h-cases.appspot.com",
  messagingSenderId: "58998219802",
  appId: "1:58998219802:web:d4c3852e2a3bb7131ddda3",
  measurementId: "G-3FJZ3DGFKE",
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { auth, db, functions };