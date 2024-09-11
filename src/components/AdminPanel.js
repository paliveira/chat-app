import { getDocs, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

const AdminPanel = () => {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="container">
            <h1>Painel de Administração</h1>
            <h2>Cadastrar Novo Participante</h2>
            <form id="addUserForm">
                <input type="email" id="newEmail" placeholder="Email" required>
                <input type="password" id="newPassword" placeholder="Senha" required>
                <button type="submit">Cadastrar</button>
            </form>
            <h2>Verificar Logs de Mensagens</h2>
            <button id="viewLogs">Ver Logs</button>
            <div id="logs"></div>
        </div>
    `;

    const addUserForm = document.getElementById('addUserForm');
    const viewLogsButton = document.getElementById('viewLogs');
    const logsContainer = document.getElementById('logs');

    addUserForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('newEmail').value;
        const password = document.getElementById('newPassword').value;

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Participante cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar participante:', error);
        }
    });

    viewLogsButton.addEventListener('click', async () => {
        const q = query(collection(db, 'messages'));
        const snapshot = await getDocs(q);
        logsContainer.innerHTML = '';
        snapshot.forEach((doc) => {
            const data = doc.data();
            logsContainer.innerHTML += `<p><strong>${data.user}</strong>: ${data.text} - ${data.timestamp.toDate()}</p>`;
        });
    });
};

export default AdminPanel;
