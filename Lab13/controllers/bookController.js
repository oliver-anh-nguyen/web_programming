const Book = require('../models/book');

exports.save = (req, res) => {
    const book = req.body;
    const newBook = new Book(null, book.title, book.isbn, book.publishedDate, book.author).save();
    res.status(201).json(newBook);
}

exports.getAll = (req, res) => {
    res.json(Book.getAll());
}

exports.getBookById = (req, res) => {
    res.json(Book.getBookById(req.params.bookId));
}

exports.deleteById = (req, res) => {
    res.json(Book.deleteById(req.params.bookId));
}

exports.update = (req, res) => {
    const book = req.body;
    const updateBook = new Book(req.params.bookId, book.title, book.isbn, book.publishedDate, book.author).update();
    res.status(200).json(updateBook);
}