// Importar funções do Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getFirestore, collection, addDoc, getDocs, query } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJECT_ID.firebaseapp.com",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_PROJECT_ID.appspot.com",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Funções utilitárias
export const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => {
    return signOut(auth);
};

export const getMessages = async () => {
    const q = query(collection(db, 'messages'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addMessage = (text, user) => {
    return addDoc(collection(db, 'messages'), {
        text,
        user,
        timestamp: new Date()
    });
};
