// @ts-nocheck
const socket = io('http://localhost:8800');
const $chatForm = document.querySelector('#chat-form');
const $chatInput = document.querySelector('#msg');
const $chatMessages = document.querySelector('.chat-messages');

const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

console.log(username, room);


socket.on('message', data => {
    console.log(data.message);
    appendOutputMessage(data);
    
    $chatMessages.scrollTop = $chatMessages.scrollHeight;
})


$chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const msg = $chatInput.value;
    
    socket.emit('chatMessage', msg);
    $chatInput.value = '';
    e.target.elements.msg.focus();
})

function appendOutputMessage(data) {
    const $div = document.createElement('div');
    $div.classList.add('message');
    $div.innerHTML = `<p class="meta">${data.username} <span>${data.time}</span></p>
						<p class="text">
							${data.message}
						</p>`;
   document.querySelector('.chat-messages').appendChild($div);
}