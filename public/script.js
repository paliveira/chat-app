const auth = firebase.auth();
const db = firebase.firestore();

// Sistema de login
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                window.location.href = 'chat.html';
            })
            .catch((error) => {
                errorMessage.textContent = "Erro: " + error.message;
            });
    });
}

// Função de logout (usada no chat e admin)
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        auth.signOut().then(() => {
            window.location.href = 'index.html';
        });
    });
}

// Painel de administrador - Registro de novos usuários
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

// Função de mensagens no chat permanece a mesma conforme mostrado anteriormente
