const Product = require('../models/product');

exports.getAll = (req, res) => {
    res.json(Product.getAll());
}