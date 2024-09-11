import { auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, db, collection, addDoc, query, onSnapshot, serverTimestamp } from './firebaseConfig.js';

// Função de login
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = 'chat.html'; // Redireciona para o chat após login
        } catch (error) {
            errorMessage.textContent = "Erro: " + error.message;
        }
    });
}

// Função de logout
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
        try {
            await signOut(auth);
            window.location.href = 'index.html'; // Redireciona para a página de login
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    });
}

// Painel de administração - Registro de novos usuários
const registerForm = document.getElementById('registerForm');
const successMessage = document.getElementById('successMessage');
const errorMessageAdmin = document.getElementById('errorMessage');

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newUserEmail = document.getElementById('newUserEmail').value;
        const newUserPassword = document.getElementById('newUserPassword').value;

        try {
            const currentUser = auth.currentUser;

            if (currentUser && currentUser.email === 'admin@chatapp.com') {
                await createUserWithEmailAndPassword(auth, newUserEmail, newUserPassword);
                successMessage.textContent = "Usuário registrado com sucesso.";
                errorMessageAdmin.textContent = '';
            } else {
                errorMessageAdmin.textContent = "Apenas administradores podem registrar novos usuários.";
            }
        } catch (error) {
            successMessage.textContent = '';
            errorMessageAdmin.textContent = "Erro: " + error.message;
        }
    });
}

// Função para enviar mensagens
const sendMessage = async (user, message) => {
    try {
        await addDoc(collection(db, 'messages'), {
            user: user,
            message: message,
            timestamp: serverTimestamp()
        });
        console.log("Mensagem enviada");
    } catch (error) {
        console.error("Erro ao enviar mensagem: ", error);
    }
};

// Função para buscar mensagens em tempo real
const chatBox = document.getElementById('chatBox'); // Suponha que chatBox é onde você vai exibir as mensagens

if (chatBox) {
    const q = query(collection(db, 'messages'));
    onSnapshot(q, (snapshot) => {
        chatBox.innerHTML = ''; // Limpa o chatBox para evitar mensagens duplicadas
        snapshot.forEach((doc) => {
            const message = doc.data();
            const messageElement = document.createElement('div');
            messageElement.textContent = `${message.user}: ${message.message}`;
            chatBox.appendChild(messageElement);
        });
    });
}
