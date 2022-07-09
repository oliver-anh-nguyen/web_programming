
window.onload = function () {
    validateUser();

    document.getElementById("btn-login").onclick = (event) => {
        event.preventDefault();
        login();
    }

    document.getElementById("btn-logout").onclick = (event) => {
        event.preventDefault();
        logout();
    }
}

function validateUser() {
    loadUILogin();
    //loadUILogout('Anh Nguyen')
    getListProducts();
}

function login() {
    // if login success
    loadUILogout("Anh Nguyen");
}

function logout() {
    // if logout sucess
    loadUILogin();
}

function loadUILogout(username) {
    document.getElementById("guest-view").style.display = 'none';
    document.getElementById("user-view").style.display = 'block';
    document.getElementById("login-container").style.display = 'none';
    document.getElementById("logout-container").style.display = 'block';
    document.getElementById("user-name").textContent = 'Welcome ' + username;
}

function loadUILogin() {
    document.getElementById("guest-view").style.display = 'block';
    document.getElementById("user-view").style.display = 'none';
    document.getElementById("login-container").style.display = 'block';
    document.getElementById("logout-container").style.display = 'none';
}

async function getListProducts() {
    let products = await fetch('http://localhost:3000/products')
        .then(response => response.json());

    const table = document.getElementById('list-products');
    products.forEach(item => table.appendChild(renderProduct(item)));
}

function renderProduct(item) {
    const tr = document.createElement('tr');

    // name
    const tdName = document.createElement('td');
    tdName.textContent = item.name;

    // price
    const tdPrice = document.createElement('td');
    tdPrice.textContent = `$${item.price}`;

    // image
    const tdImage = document.createElement('td');
    const img = document.createElement('img');
    img.src = item.img;
    tdImage.appendChild(img);

    // stock
    const tdStock = document.createElement('td');
    tdStock.textContent = item.stock;

    // carts
    const tdCart = document.createElement('td');
    const iconCart = document.createElement('img');
    iconCart.src = "public/icon_shopping.png"
    iconCart.onclick = function() {
        insertProduct(item);
    };
    tdCart.appendChild(iconCart);

    tr.appendChild(tdName);
    tr.appendChild(tdPrice);
    tr.appendChild(tdImage);
    tr.appendChild(tdStock);
    tr.appendChild(tdCart);

    return tr;
}

function insertProduct(item) {
    console.log(item);
    loadUICarts();
}

function loadUICarts() {
    document.getElementById("cart-empty").style.display = 'none';
    document.getElementById("cart-product").style.display = 'block';
}

function loadUIEmptyCart() {
    document.getElementById("cart-empty").style.display = 'block';
    document.getElementById("cart-product").style.display = 'none';
}