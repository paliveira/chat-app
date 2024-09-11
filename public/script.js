// Inicialize o Firebase
//const auth = firebase.auth();
//const db = firebase.firestore();

// Função de login
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                window.location.href = 'chat.html'; // Redireciona para o chat após login
            })
            .catch((error) => {
                errorMessage.textContent = "Erro: " + error.message;
            });
    });
}

// Função de logout
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        auth.signOut().then(() => {
            window.location.href = 'index.html'; // Redireciona para a página de login
        });
    });
}

// Painel de administração - Registro de novos usuários
const registerForm = document.getElementById('registerForm');
const successMessage = document.getElementById('successMessage');
const errorMessageAdmin = document.getElementById('errorMessage');

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newUserEmail = document.getElementById('newUserEmail').value;
        const newUserPassword = document.getElementById('newUserPassword').value;

        // Verificando se o usuário atual é um administrador
        const currentUser = auth.currentUser;

        if (currentUser && currentUser.email === 'admin@chatapp.com') {
            auth.createUserWithEmailAndPassword(newUserEmail, newUserPassword)
                .then(() => {
                    successMessage.textContent = "Usuário registrado com sucesso.";
                    errorMessageAdmin.textContent = '';
                })
                .catch((error) => {
                    successMessage.textContent = '';
                    errorMessageAdmin.textContent = "Erro: " + error.message;
                });
        } else {
            errorMessageAdmin.textContent = "Apenas administradores podem registrar novos usuários.";
        }
    });
}

// Função para enviar mensagens
const sendMessage = (user, message) => {
    db.collection('messages').add({
        user: user,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log("Mensagem enviada");
    }).catch((error) => {
        console.error("Erro ao enviar mensagem: ", error);
    });
};

// Função para buscar mensagens em tempo real
const chatBox = document.getElementById('chatBox'); // Suponha que chatBox é onde você vai exibir as mensagens

if (chatBox) {
    db.collection('messages').orderBy('timestamp').onSnapshot((snapshot) => {
        chatBox.innerHTML = ''; // Limpa o chatBox para evitar mensagens duplicadas
        snapshot.forEach((doc) => {
            const message = doc.data();
            const messageElement = document.createElement('div');
            messageElement.textContent = `${message.user}: ${message.message}`;
            chatBox.appendChild(messageElement);
        });
    });
}
