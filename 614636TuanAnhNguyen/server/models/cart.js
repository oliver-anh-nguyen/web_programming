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

    addCart(productId, username) {
        const product =  Product.getProductById(productId);
        const cart = Cart.getCartByUser(username);
        let cartItem = {};
        cartItem.id = product.id;
        cartItem.price = product.price;
        cartItem.name = product.name;
        cartItem.quantity = 1;
        if (cart.canAddProduct(cartItem, product.stock)) {
            const result = cart.addItem(cartItem);
            const total = cart.totalCost();
            return {item: result, total};
        } else {
            return {error:'out-of-stock'};
        }
    }

    addItem(cartItem) {
        let product = this.products.find(p => p.id === cartItem.id);
        if (!product) {
            product = cartItem;
            product.quantity = cartItem.quantity;
            cartItem.total = cartItem.quantity * cartItem.price;
            this.products.push(cartItem);
        } else {
            product.quantity += cartItem.quantity;
            product.total = product.quantity * product.price;
        }
        return product;
    }

    canAddProduct(cartItem, stock) {
        const product = this.products.find(p => p.id === cartItem.id);
        let quantity = cartItem.quantity;
        if (product) {
            quantity += product.quantity;
        }
        return quantity <= stock;
    }

    getCart(username) {
        const cart = Cart.getCartByUser(username);
        const total = cart.totalCost();
        return { items: cart.products, total };
    }

    updateCard(id, quantity, username) {
        const product =  Product.getProductById(id);
        const cart = Cart.getCartByUser(username);
        let cartItem = {};
        cartItem.id = product.id;
        cartItem.price = product.price;
        cartItem.name = product.name;
        cartItem.quantity = quantity;
        if (quantity > 0 && !cart.canAddProduct(cartItem, product.stock)) {
            return {error:'out-of-stock'};
        } else if (quantity < 0 && !cart.canAddProduct(cartItem, product.stock)) {
            const result = cart.products.find(product => product.id === cartItem.id);
            if (result) {
                result.quantity = product.stock;
                result.total = result.quantity * result.price;
                if (result.quantity == 0) {
                    const index = cart.products.indexOf(result);
                    cart.products.splice(index, 1);
                }
            }
            const total = cart.totalCost();
            return {  total, item: result };
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

            if (!cart.products || cart.products.length === 0) {
                return {error: 'cart-empty'};
            }

            cart.products.forEach((prod) => {
                Product.updateStock(prod);
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
            const isOrder = Product.checkProductStock(id, quantity);
            return !isOrder;
        });

        return canPlaceOrder.length === 0;
    }

    update(item) {
        const product = this.products.find(product => product.id === item.id);
        if (product) {
            product.quantity += item.quantity;
            product.total = product.quantity * product.price;
            if (product.quantity == 0) {
                const index = this.products.indexOf(product);
                this.products.splice(index, 1);
            }
        }
        return product;
    }

    totalCost() {
        return this.products.reduce((total, item) => {
            return total + item.total;
        }, 0);
    }
}

