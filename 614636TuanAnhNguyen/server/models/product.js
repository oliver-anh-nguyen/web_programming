let products = [
    {
        id: '1',
        name: 'Swift',
        price: 79.00,
        stock: 30,
        img: 'http://localhost:3000/public/swift.png'
    },
    {
        id: '2',
        name: 'Python',
        price: 39.39,
        stock: 20,
        img: 'http://localhost:3000/public/python.png'
    },
    {
        id: '3',
        name: 'NodeJs',
        price: 20.20,
        stock: 45,
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
};
