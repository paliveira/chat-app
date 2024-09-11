// Importar funções do Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getFirestore, collection, addDoc, query, onSnapshot, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';


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
// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Exportar instâncias
export { auth, db, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, collection, addDoc, query, onSnapshot, serverTimestamp };
