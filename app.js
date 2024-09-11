// Configuração do Firebase
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_DOMINIO_FIREBASE",
    projectId: "SEU_PROJETO_FIREBASE",
    storageBucket: "SEU_BUCKET",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Elementos da UI
const loginContainer = document.getElementById('login-container');
const chatContainer = document.getElementById('chat-container');
const loginBtn = document.getElementById('login-btn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const messagesDiv = document.getElementById('messages');
const sendBtn = document.getElementById('send-btn');
const messageInput = document.getElementById('message-input');
const logoutBtn = document.getElementById('logout-btn');

// Login
loginBtn.addEventListener('click', () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Autenticação simples (substituir com regras reais)
    db.collection('users').where('username', '==', username).where('password', '==', password).get()
        .then(querySnapshot => {
            if (!querySnapshot.empty) {
                loginContainer.style.display = 'none';
                chatContainer.style.display = 'block';
            } else {
                alert('Usuário ou senha incorretos!');
            }
        }).catch(error => console.log(error));
});

// Enviar mensagens
sendBtn.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        db.collection('messages').add({
            user: usernameInput.value,
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            room: 'public' // Alterar para a sala ativa
        });
        messageInput.value = '';
    }
});

// Exibir mensagens em tempo real
db.collection('messages').orderBy('timestamp').onSnapshot(snapshot => {
    messagesDiv.innerHTML = '';
    snapshot.forEach(doc => {
        const message = doc.data();
        const messageElement = document.createElement('div');
        messageElement.textContent = `${message.user}: ${message.message}`;
        messagesDiv.appendChild(messageElement);
    });
});

// Logout
logoutBtn.addEventListener('click', () => {
    loginContainer.style.display = 'block';
    chatContainer.style.display = 'none';
    usernameInput.value = '';
    passwordInput.value = '';
});
