import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA5GTIPOkReef3ARbXIsHzVC_JfDE7AwHw",
  authDomain: "hanoieats-2b3a7.firebaseapp.com",
  projectId: "hanoieats-2b3a7",
  storageBucket: "hanoieats-2b3a7.firebasestorage.app",
  messagingSenderId: "491830908753",
  appId: "1:491830908753:web:9e15491638363f36efa570"
};

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
export default firebaseApp;
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
