const Book = require('../models/bookModel');

// Create a new book
exports.createBook = (req, res) => {
    const book = req.body;
    if (!book.title || !book.author) {
        return res.status(400).json({ error: 'Title and author are required.' });
    }
    Book.addBook(book, (err, bookId) => {
        if (err) return res.status(500).json({ error: 'Failed to create book.' });
        res.status(201).json({ message: 'Book created successfully', bookId });
    });
};

// Get all books with search and pagination
exports.getAllBooks = (req, res) => {
    let { page = 1, limit = 2, search = '', searchBy = 'title' } = req.query;

    // Ensure page and limit are numbers
    page = parseInt(page);
    limit = parseInt(limit);

    const offset = (page - 1) * limit;

    // Sanitize searchBy and define a search query
    const validSearchFields = ['title', 'author', 'isbn'];
    const searchField = validSearchFields.includes(searchBy) ? searchBy : 'title';
    const searchQuery = `%${search}%`;

    Book.getAllBooksWithSearchAndPagination(searchField, searchQuery, limit, offset, (err, books) => {
        if (err) return res.status(500).json({ error: 'Failed to retrieve books.' });
        Book.countBooksWithSearch(searchField, searchQuery, (err, totalCount) => {
            if (err) return res.status(500).json({ error: 'Failed to count books.' });
            res.status(200).json({
                books,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                totalBooks: totalCount
            });
        });
    });
};


// Get book by ID
exports.getBookById = (req, res) => {
    const bookId = req.params.id;
    Book.getBookById(bookId, (err, book) => {
        if (err) return res.status(500).json({ error: 'Failed to retrieve book.' });
        if (!book) return res.status(404).json({ error: 'Book not found.' });
        res.status(200).json(book);
    });
};

// Update a book
exports.updateBook = (req, res) => {
    const bookId = req.params.id;
    const updatedBook = req.body;
    Book.updateBook(bookId, updatedBook, (err) => {
        if (err) return res.status(500).json({ error: 'Failed to update book.' });
        res.status(200).json({ message: 'Book updated successfully' });
    });
};

// Delete a book
exports.deleteBook = (req, res) => {
    const bookId = req.params.id;
    Book.deleteBook(bookId, (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete book.' });
        res.status(200).json({ message: 'Book deleted successfully' });
    });
};
