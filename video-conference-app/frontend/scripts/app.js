const socket = io(); // Initialize Socket.io

const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream);

    socket.emit('join-room', ROOM_ID); // Replace ROOM_ID with the actual room ID

    socket.on('user-connected', userId => {
        connectToNewUser(userId, stream);
    });
});

socket.on('user-disconnected', userId => {
    const video = document.getElementById(userId);
    if (video) video.remove();
});

function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    videoGrid.append(video);
}

function connectToNewUser(userId, stream) {
    const call = peer.call(userId, stream);
    const video = document.createElement('video');

    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream);
    });

    call.on('close', () => {
        video.remove();
    });

    video.id = userId;
}

const messageInput = document.getElementById('chat-message-input');
const messageContainer = document.getElementById('chat-messages');

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && messageInput.value) {
        socket.emit('chat-message', messageInput.value);
        messageInput.value = '';
    }
});

socket.on('chat-message', message => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageContainer.append(messageElement);
});