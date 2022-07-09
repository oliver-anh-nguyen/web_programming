const express = require('express');
const app = express();
const bookRoute = require('./routes/bookRouter')
const cors = require('cors');

app.use(cors());
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