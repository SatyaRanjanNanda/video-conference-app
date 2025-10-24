const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to the SQLite database
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Function to create tables if they don't exist
const createTables = () => {
    db.run(`CREATE TABLE IF NOT EXISTS rooms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        room_id TEXT UNIQUE,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        room_id TEXT,
        message TEXT,
        sender TEXT,
        sent_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (room_id) REFERENCES rooms (room_id)
    )`);
};

// Function to save room information
const saveRoom = (roomId) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO rooms (room_id) VALUES (?)`, [roomId], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
};

// Function to save chat messages
const saveMessage = (roomId, message, sender) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO messages (room_id, message, sender) VALUES (?, ?, ?)`, [roomId, message, sender], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
};

// Function to get messages for a room
const getMessages = (roomId) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM messages WHERE room_id = ?`, [roomId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Create tables on startup
createTables();

// Export database functions
module.exports = {
    saveRoom,
    saveMessage,
    getMessages,
};