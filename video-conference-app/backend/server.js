const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const db = require('./database/db');
const socketHandler = require('./socket/index');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.post('/create-room', (req, res) => {
    const roomId = req.body.roomId;
    // Logic to create a room in the database
    db.createRoom(roomId)
        .then(() => res.status(201).send({ roomId }))
        .catch(err => res.status(500).send({ error: 'Room creation failed' }));
});

app.post('/join-room', (req, res) => {
    const roomId = req.body.roomId;
    // Logic to check if the room exists
    db.checkRoom(roomId)
        .then(roomExists => {
            if (roomExists) {
                res.status(200).send({ roomId });
            } else {
                res.status(404).send({ error: 'Room not found' });
            }
        })
        .catch(err => res.status(500).send({ error: 'Error checking room' }));
});

// Socket.io events
io.on('connection', (socket) => {
    socketHandler(io, socket);
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});