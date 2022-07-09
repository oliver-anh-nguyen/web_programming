const express = require('express');
const app = express();
const productRouter = require('./routes/productRouter');
app.use(express.json());

app.use('/products', productRouter);

app.listen(3000, () => {
    console.log('listen 3000');
})