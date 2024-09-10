const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error('Failed to connect to the database.', err.message);
    }
    console.log('Connected to SQLite database.');
});

db.serialize(() => {
    db.run(`CREATE TABLE books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        genre TEXT,
        publicationYear INTEGER,
        imageUrl TEXT,
        isbn TEXT UNIQUE,
        description TEXT
    )`);
});

module.exports = db;
