const express = require('express');
const cors = require('cors');
const path = require("path");
const productRoute = require('./routes/productRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/public", express.static(path.join(__dirname, 'public')));
app.use('/products', productRoute);


app.listen(3000);