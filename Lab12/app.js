// 1. Create a npm project and install Express.js (Nodemon if you want)
// 2. Change your Express.js app which serves HTML files (of your choice with your content)
// for “/”, “/users” and “/products”.
// 3. For “/users” and “/products”, provides GET and POST requests handling (of your choice with your content)
// in different routers.
// 4. Add some static (.js or .css) files to your project that should be required by at least one of your HTML files.
// 5. Customize your 404 page
// 6. Provide your own error handling

const express = require('express');
const productRouter = require('./routes/products');
const userRouter = require('./routes/users');
const addRouter = require('./routes/addproduct');

const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/addproduct', addRouter);

app.get('/',(req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.use((err, req, res, next) => {
    res.status(500).send('Some thing wrong');
});

app.use((req, res, next) => {
   res.status(404).sendFile(path.join(__dirname, 'views', '404pages.html'));
});

app.listen(3000);





// app.use('/',(req, res, next) => {
//     console.log('This middleware always run!');
//     next();
// });
// app.use('/add-product', (req, res, next) => { console.log('In the middleware!'); res.send('<h1>The "Add Product" Page</h1>');
// });
// app.use('/', (req, res, next) => { console.log('In another middleware!'); res.send('<h1>Hello from Express</h1>');
// });