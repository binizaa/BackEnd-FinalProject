const socket = io();
const button = document.getElementById('add');
const input = document.getElementById('textInput');
const div = document.getElementById('textOutput');

button.addEventListener('click', () => {
    socket.emit('message', input.value);
    input.value = '';
});

socket.on('messages', data => {
    div.innerHTML = `
    <ul>
        ${data.map(p => `<li>id: ${p.id} message: ${p.message}</li>`).join('')}
    </ul>
    `;
});