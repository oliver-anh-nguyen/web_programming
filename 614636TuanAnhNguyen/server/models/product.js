let products = [
    {
        id: '1',
        name: 'Swift',
        price: 79.00,
        stock: 5,
        img: 'http://localhost:3000/public/swift.png'
    },
    {
        id: '2',
        name: 'Python',
        price: 39.39,
        stock: 10,
        img: 'http://localhost:3000/public/python.png'
    },
    {
        id: '3',
        name: 'NodeJs',
        price: 20.20,
        stock: 7,
        img: 'http://localhost:3000/public/nodejs.png'
    }
];

module.exports = class Product {
    constructor(id, name, price, stock, img) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.img = img;
    }

    static getAll() {
        return products;
    }

    static getProductById(productId) {
        let product = products.find(p => p.id === productId);
        return product;
    }

    static checkProductStock(productId, quantity) {
        const prod = Product.getProductById(productId);
        return prod.stock >= quantity;
    }

    static updateStock(prod) {
        const product = Product.getProductById(prod.id);
        if (product) {
            product.stock -= prod.quantity;
        }
        return product;
    }
};
