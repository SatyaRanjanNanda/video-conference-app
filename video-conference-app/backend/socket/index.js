const socketIO = require('socket.io');

let io;

const initSocket = (server) => {
    io = socketIO(server);

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('joinRoom', (roomId) => {
            socket.join(roomId);
            console.log(`User ${socket.id} joined room ${roomId}`);
            socket.to(roomId).emit('userJoined', socket.id);
        });

        socket.on('sendMessage', (roomId, message) => {
            socket.to(roomId).emit('receiveMessage', message);
        });

        socket.on('stream', (roomId, data) => {
            socket.to(roomId).emit('stream', data);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};

const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
};

module.exports = {
    initSocket,
    getIO,
};