const socket = io('http://localhost:3000');

const messageForm = document.getElementById('send');
const messageInput = document.getElementById('message');
const messageContainer = document.getElementById('messages');
const name = document.getElementById('name');



socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`);
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`);
});
socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`);
});
messageForm.addEventListener('click', e => {
    let flag = 0;
    e.preventDefault()
    if (flag === 0) {
        appendMessage('you joined');
        socket.emit('new-user', name.value);
        flag = 1;
    }
    const message = messageInput.value;
    appendMessage(`You : ${message}`);
    socket.emit('send-chat-message', message);
    messageInput.value = '';
    name.value = '';

})

function appendMessage(message) {

    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageContainer.append(messageElement);

}