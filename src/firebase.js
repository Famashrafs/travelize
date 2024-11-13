// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // No need to import doc and setDoc here
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyASq_1EerZ-H0QbVkWxTus0kgvlDigDcf4",
  authDomain: "travel-63e97.firebaseapp.com",
  projectId: "travel-63e97",
  storageBucket: "travel-63e97.appspot.com",
  messagingSenderId: "55450640036",
  appId: "1:55450640036:web:56e1d900d57916e6301031"
};

const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore
const storage = getStorage(app);

export { auth, db, googleProvider, facebookProvider, storage };
