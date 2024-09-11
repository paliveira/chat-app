import { onSnapshot, collection, addDoc, query, where } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

const ChatRoom = () => {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="container">
            <h1>Chat Público</h1>
            <div id="messages"></div>
            <form id="messageForm">
                <input type="text" id="message" placeholder="Digite sua mensagem" required>
                <button type="submit">Enviar</button>
            </form>
        </div>
    `;

    const messagesContainer = document.getElementById('messages');
    const messageForm = document.getElementById('messageForm');

    // Escuta mensagens em tempo real
    const q = query(collection(db, 'messages'));
    onSnapshot(q, (snapshot) => {
        messagesContainer.innerHTML = '';
        snapshot.forEach((doc) => {
            const data = doc.data();
            messagesContainer.innerHTML += `<p><strong>${data.user}</strong>: ${data.text}</p>`;
        });
    });

    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const messageInput = document.getElementById('message');
        const messageText = messageInput.value;

        try {
            const user = auth.currentUser;
            await addDoc(collection(db, 'messages'), {
                text: messageText,
                user: user.email,
                timestamp: new Date()
            });
            messageInput.value = '';
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    });
};

export default ChatRoom;
