const Product = require('../models/product');
let carts = [];

module.exports = class Cart {
    constructor(username) {
        this.username = username;
        this.products = [];
    }

    static getCartByUser(username) {
        let cart = carts.find(cart => cart.username === username);
        if (!cart) {
            cart = new Cart(username);
            carts.push(cart);
        }
        return cart;
    }

    addProduct(productId, username, quantity) {
        const product =  Product.getProductById(productId);
        const cart = Cart.getCartByUser(username);
        let cartItem = {};
        cartItem.id = product.id;
        cartItem.price = product.price;
        cartItem.name = product.name;
        cartItem.quantity = quantity;
        if (cart.canAddItem(cartItem, product.stock)) {
            const result = cart.add(cartItem);
            const total = cart.totalCost();
            return {total, item: result};
        } else {
            return {error:'out-of-stock'};
        }
    }

    getCart(username) {
        const cart = Cart.getCartByUser(username);
        const total = cart.totalCost();
        return { total, items: cart.products };
    }

    updateCard(id, quantity, username) {
        const product =  Product.getProductById(id);
        const cart = Cart.getCartByUser(username);
        let cartItem = {};
        cartItem.id = product.id;
        cartItem.price = product.price;
        cartItem.name = product.name;
        cartItem.quantity = quantity;
        if (quantity > 0 && !cart.canAddItem(cartItem, product.stock)) {
            return {error:'out-of-stock'};
        } else {
            const result = cart.update(cartItem);
            const total = cart.totalCost();
            if (result) {
                return {  total, item: result };
            } else {
                return { item: { ...cartItem, quantity: 0 }, total };
            }
        }
    }

    orderCart(username) {
        const cart = Cart.getCartByUser(username);
        if (cart.canPlaceOrder(username)) {
            cart.placeOrder();

            if (!cart.items || cart.items.length === 0) {
                return {error: 'cart-empty'};
            }

            cart.items.forEach((prod) => {
                Product.placeOrder(prod);
            });

            return { message: "order-success" };
        }
        return {error: 'order-fail'};
    }

    placeOrder() {
        const index = carts.indexOf(this);
        if (index > -1) {
            return carts.splice(index, 1);
        }
        return {};
    }

    canPlaceOrder(username) {
        const cart = Cart.getCartByUser(username);
        const canPlaceOrder = cart.products.filter((item) => {
            const { id, quantity } = item;
            const isOrder = Product.canPlaceOrder(id, quantity);
            return !isOrder;
        });

        return canPlaceOrder.length === 0;
    }

    update(item) {
        const i = this.products.find(i => i.id === item.id);
        if (i) {
            i.quantity += item.quantity;
            i.total = i.quantity * i.price;
            if (i.quantity <= 0) {
                const index = this.products.indexOf(i);
                this.products.splice(index, 1);
            }
        }
        return i;
    }

    totalCost() {
        return this.products.reduce((total, item) => {
            return total + item.total;
        }, 0);
    }

    add(item) {
        let i = this.products.find(i => i.id === item.id);
        if (!i) {
            i = item;
            i.quantity = item.quantity;
            item.total = item.quantity * item.price;
            this.products.push(item);
        } else {
            i.quantity += item.quantity;
            i.total = i.quantity * i.price;
        }
        return i;
    }

    canAddItem(item, stock) {
        const i = this.products.find(i => i.id === item.id);
        let quantity = item.quantity;
        if (i) {
            quantity += i.quantity;
        }
        return quantity <= stock;
    }
}

