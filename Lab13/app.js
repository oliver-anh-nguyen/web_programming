// Download the start-up project shoppingcart-server from class demo or
// you create everything from scrtach.
// Run "npm install" under shoppingcart-server to get express package installed.
// Implement the features below inside shoppingcart-server REST applicaiton
// CRUD(create, read, update, delete) books: make sure you use the proper URLs and HTTP Methods
// A book has properties: id, title, ISBN, publishedDate, author
// make proper changes in js files to implement the step 1 features
// Use Postman to test your REST APIs

const express = require('express');
const app = express();
const bookRoute = require('./routes/bookRouter')

app.use(express.json());

app.use('/books', bookRoute);

app.use((req, res, next) => {
   res.status(404).json({ error: req.url + ' API not supported!' });
});

app.use((err, req, res, next) => {
   if (err.message === 'Not found! Book not exist!') {
       res.status(404).json({error: err.message});
   } else {
       res.status(500).json({error: 'Error! Try later!'})
   }
});

app.listen(3000);