const Cart = require('../models/cart');

exports.getCartByUser = (req, res) => {
    res.json(Cart.getCartByUser(req.user));
}

exports.addCart = (req, res) => {
    const cart = Cart.getCartByUser(req.user);
    res.json(cart.addCart(req.params.productId, req.user));
}

exports.getCart = (req, res) => {
    const cart = Cart.getCartByUser(req.user);
    res.json(cart.getCart(req.user));
}

exports.updateCart = (req, res) => {
    const cart = Cart.getCartByUser(req.user);
    res.json(cart.updateCard(req.body.id, req.body.quantity, req.user));
}

exports.orderCart = (req, res) => {
    const cart = Cart.getCartByUser(req.user);
    res.json(cart.orderCart(req.user));
}