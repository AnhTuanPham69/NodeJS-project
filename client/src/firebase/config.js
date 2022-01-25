import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzKeaSomK4D5SC2s6_tUKNSUNcq6pa9QY",
  authDomain: "chat-app-3be53.firebaseapp.com",
  projectId: "chat-app-3be53",
  storageBucket: "chat-app-3be53.appspot.com",
  messagingSenderId: "936726039565",
  appId: "1:936726039565:web:f2a86742d587ed28301944",
  measurementId: "G-D602GBZNNW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

if (window.location.hostname === 'localhost') {
  // auth.useEmulator('http://localhost:9099');
  // db.useEmulator('localhost', '8080');
}

export { db, auth };
export default firebase;
