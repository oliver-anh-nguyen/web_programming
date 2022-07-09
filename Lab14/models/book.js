const crypto = require('crypto');
let books = [];

// A book has properties: id, title, ISBN, publishedDate, author
module.exports = class Book {
    constructor(id, title, isbn, publishedDate, author) {
        this.id = id;
        this.title = title;
        this.isbn = isbn;
        this.publishedDate = publishedDate;
        this.author = author;
    }

    save() {
        this.id = crypto.randomUUID();
        books.push(this);
        return this;
    }

    update() {
        const index = books.findIndex(p => p.id == this.id);
        if (index > -1) {
            books.splice(index, 1, this);
            return this;
        } else {
            throw new Error('Not found! Book not exist!');
        }
    }

    static getAll() {
        return books;
    }

    static getBookById(bookId) {
        const index = books.findIndex(p => p.id == bookId);
        if (index > -1) {
            return books[index];
        } else {
            throw new Error('Not found! Book not exist!');
        }
    }

    static deleteById(bookId) {
        const index = books.findIndex(p => p.id == bookId);
        const bookDeleted = books[index];
        if (index > -1) {
            books = books.filter(p => p.id != bookId);
            return bookDeleted;
        } else {
            throw new Error('Not found! Book not exist!');
        }
    }
}