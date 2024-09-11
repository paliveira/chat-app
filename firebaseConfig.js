// Verifique se a versão do Firebase que você está usando é compatível com esta sintaxe
// O código abaixo assume o uso do Firebase v9 ou superior, que usa módulos ES
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyA2rZO8yXC6MnXcsP_m7V-RFjPnixj9ONc",
  authDomain: "chatdeaula-2c949.firebaseapp.com",
  projectId: "chatdeaula-2c949",
  storageBucket: "chatdeaula-2c949.appspot.com",
  messagingSenderId: "788797048931",
  appId: "1:788797048931:web:67bc97cee7c80e75921056",
  measurementId: "G-K7RVRQP1LQ"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("Firebase inicializado");

