const db = require('../db');

// Get books with search and pagination
exports.getAllBooksWithSearchAndPagination = (searchField, searchQuery, limit, offset, callback) => {
    const query = `SELECT * FROM books WHERE ${searchField} LIKE ? LIMIT ? OFFSET ?`;
    db.all(query, [searchQuery, limit, offset], (err, rows) => callback(err, rows));
};

// Count books with search
exports.countBooksWithSearch = (searchField, searchQuery, callback) => {
    const query = `SELECT COUNT(*) AS total FROM books WHERE ${searchField} LIKE ?`;
    db.get(query, [searchQuery], (err, result) => callback(err, result.total));
};


// Get book by ID
exports.getBookById = (id, callback) => {
    const query = 'SELECT * FROM books WHERE id = ?';
    db.get(query, [id], (err, row) => callback(err, row));
};

// Add a new book
exports.addBook = (book, callback) => {
    const query = `INSERT INTO books (title, author, genre, publicationYear, imageUrl, isbn, description) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const { title, author, genre, publicationYear, imageUrl, isbn, description } = book;
    db.run(query, [title, author, genre, publicationYear, imageUrl, isbn, description], function (err) {
        callback(err, this.lastID);
    });
};

// Update a book
exports.updateBook = (id, book, callback) => {
    const query = `UPDATE books SET title = ?, author = ?, genre = ?, publicationYear = ?, imageUrl = ?, isbn = ?, description = ? WHERE id = ?`;
    const { title, author, genre, publicationYear, imageUrl, isbn, description } = book;
    db.run(query, [title, author, genre, publicationYear, imageUrl, isbn, description, id], (err) => callback(err));
};

// Delete a book
exports.deleteBook = (id, callback) => {
    const query = 'DELETE FROM books WHERE id = ?';
    db.run(query, [id], (err) => callback(err));
};
