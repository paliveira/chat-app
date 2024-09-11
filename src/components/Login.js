import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

const Login = () => {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="container">
            <h1>Login</h1>
            <form id="loginForm">
                <input type="email" id="email" placeholder="Email" required>
                <input type="password" id="password" placeholder="Senha" required>
                <button type="submit">Entrar</button>
            </form>
            <p id="errorMessage"></p>
        </div>
    `;

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Redirecionar para o painel ou sala de chat após login
            window.location.href = 'chat.html'; // Exemplo
        } catch (error) {
            document.getElementById('errorMessage').textContent = error.message;
        }
    });
};

export default Login;
