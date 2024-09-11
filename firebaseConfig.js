
// Importando as funções necessárias do Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA2rZO8yXC6MnXcsP_m7V-RFjPnixj9ONc",
  authDomain: "chatdeaula-2c949.firebaseapp.com",
  projectId: "chatdeaula-2c949",
  storageBucket: "chatdeaula-2c949.appspot.com",
  messagingSenderId: "788797048931",
  appId: "1:788797048931:web:67bc97cee7c80e75921056",
  measurementId: "G-K7RVRQP1LQ"
};

// Inicializando o Firebase

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

console.log("Firebase inicializado");

