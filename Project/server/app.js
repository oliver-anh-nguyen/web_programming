const express = require('express');
const cors = require('cors');
const path = require("path");
const productRoute = require('./routes/productRouter');
const userRoute = require('./routes/userRouter');
const cartRoute = require('./routes/cartRoute');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/public", express.static(path.join(__dirname, 'public')));
app.use('/login', userRoute);

app.use((req, res, next) => {
    const auth = req.headers.authorization;
    if (auth) {
        const token = auth.split(' ')[1];
        if (token === 'null' || token == undefined) {
            res.json({error: 'no-access-token'});
        } else {
            req.user = token.split('-')[0];
            next();
        }
    }

});

app.use('/products', productRoute);
app.use('/cart', cartRoute);

app.listen(process.env.PORT || 5000)