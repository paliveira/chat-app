// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2rZO8yXC6MnXcsP_m7V-RFjPnixj9ONc",
  authDomain: "chatdeaula-2c949.firebaseapp.com",
  projectId: "chatdeaula-2c949",
  storageBucket: "chatdeaula-2c949.appspot.com",
  messagingSenderId: "788797048931",
  appId: "1:788797048931:web:67bc97cee7c80e75921056",
  measurementId: "G-K7RVRQP1LQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
