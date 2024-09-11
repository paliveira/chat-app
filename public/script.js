document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const login = document.createElement('script');
    login.src = 'src/components/Login.js';
    login.type = 'module';
    app.appendChild(login);
});
