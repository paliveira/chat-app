const auth = firebase.auth();
const db = firebase.firestore();

// Sistema de login e registro
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const registerLink = document.getElementById('registerLink');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        auth.signInWithEmailAndPassword(username + "@chatapp.com", password)
            .then(() => {
                window.location.href = 'chat.html';
            })
            .catch((error) => {
                errorMessage.textContent = "Erro: " + error.message;
            });
    });

    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        const username = prompt("Escolha um nome de usuário:");
        const password = prompt("Escolha uma senha:");
        auth.createUserWithEmailAndPassword(username + "@chatapp.com", password)
            .then(() => {
                alert('Usuário registrado com sucesso');
            })
            .catch((error) => {
                errorMessage.textContent = "Erro: " + error.message;
            });
    });
}

// Bate-papo público
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const chatBox = document.getElementById('chat-box');

if (messageForm) {
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value;
        const user = auth.currentUser.email.split('@')[0];
        db.collection('messages').add({
            user: user,
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        messageInput.value = '';
    });

    // Exibindo mensagens
    db.collection('messages').orderBy('timestamp').onSnapshot((snapshot) => {
        chatBox.innerHTML = '';
        snapshot.forEach((doc) => {
            const message = doc.data();
            const messageElement = document.createElement('div');
            messageElement.textContent = `${message.user}: ${message.message}`;
            chatBox.appendChild(messageElement);
        });
    });
}

// Logout
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        auth.signOut().then(() => {
            window.location.href = 'index.html';
        });
    });
}
