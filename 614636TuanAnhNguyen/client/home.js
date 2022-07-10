
window.onload = function () {
    validateUser();

    document.getElementById("btn-login").onclick = (event) => {
        event.preventDefault();
        login();
    }

    document.getElementById("btn-order").onclick = (event) => {
        event.preventDefault();
        order();
    }

    document.getElementById("btn-logout").onclick = (event) => {
        event.preventDefault();
        logout();
    }
}

function validateUser() {
    let user = sessionStorage.getItem('accessToken');
    if (user) {
        const userName = user.split('-')[0];
        loadUILogout(userName);
        getListProducts();
        getListCards();
    } else {
        loadUILogin();
    }
}

function logout() {
    sessionStorage.removeItem('accessToken')
    removeUIChildProduct();
    removeUIChildCart();
    loadUILogin();
}

async function order() {
    let orderCart = await fetch(`http://localhost:3000/cart/place-order`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        },
    });
    const result = await orderCart.json();

    if (result.error) {
        showAlertError(result.error);
    } else {
        updateTotalCost(0);
        loadUICarts(false);
        removeUIChildCart();
        removeUIChildProduct();
        getListProducts();
        alert(result.message);
    }
}

async function login() {
    let user = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify({
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await user.json();
    if (result.error) {
        showErrorLogin();
    } else {
        hideErrorLogin()
        sessionStorage.setItem('accessToken', result.accessToken);
        document.getElementById('form-login').reset();
        const userName = result.accessToken.split('-')[0];
        loadUILogout(userName);
        getListProducts();
        getListCards();
    }
}

async function getListCards() {
    let products = await fetch('http://localhost:3000/cart',{
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    });
    const result = await products.json();
    if (result.error) {
        showAlertError(result.error);
    } else if (result.total == 0) {
        loadUICarts(false);
    } else {
        loadUICarts(true);
        updateTotalCost(result.total);
        renderCartTable(result.items);
    }
}

async function getListProducts() {
    let products = await fetch('http://localhost:3000/products',{
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    });
    const result = await products.json();
    if (result.error) {
        showAlertError(result.error);
    } else {
        const table = document.getElementById('list-products');
        result.forEach(item => table.appendChild(renderProduct(item)));
    }
}

async function insertProduct(item) {
    let carts = await fetch(`http://localhost:3000/cart/${item.id}`,{
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    });
    const result = await carts.json();
    if (result.error) {
        showAlertError(result.error);
    } else {
        loadUICarts(result.total > 0);
        addCartItem(result.item);
        updateTotalCost(result.total);
    }
}

async function updateQuantity(cartItem, quantity) {
    let cart = await fetch(`http://localhost:3000/cart`, {
        method: "PUT",
        body: JSON.stringify({
            id: cartItem.id,
            quantity: quantity,
        }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    });
    const result = await cart.json();

    if (result.error) {
        showAlertError(result.error);
    } else {
        loadUICarts(result.total > 0);
        addCartItem(result.item);
        updateTotalCost(result.total);
    }
}

function addCartItem(item) {
    const id = item.id;
    let tr = document.getElementById(`cart-id-${id}`);
    if (tr) {
        if (item.quantity == 0) {
            const table = document.getElementById("list-carts");
            table.removeChild(tr);
            return;
        }
        const total = document.getElementById(`cart-total-${id}`);
        total.textContent = formatTotal(item.total);
        const quantity = document.getElementById(`cart-quantity-${id}`);
        quantity.textContent = item.quantity;
    } else {
        renderCartItem(item);
    }
}

function updateTotalCost(total) {
    const cartTotal = document.getElementById("total-cart");
    cartTotal.textContent = `Total: $${(Math.round(total * 100) / 100).toFixed(2)}`;
}

function renderCartTable(items) {
    items.forEach((prod) => {
        renderCartItem(prod);
    });
}

function removeUIChildProduct() {
    let tableProducts = document.getElementById('list-products');
    let tableRows = tableProducts.getElementsByTagName('tr');
    let rowCount = tableRows.length;

    for (let x=rowCount-1; x>0; x--) {
        tableProducts.removeChild(tableRows[x]);
    }
}

function removeUIChildCart() {
    let tableCarts = document.getElementById('list-carts');
    let tableRows = tableCarts.getElementsByTagName('tr');
    let rowCount = tableRows.length;

    for (let x=rowCount-1; x>1; x--) {
        tableCarts.removeChild(tableRows[x]);
    }
}

function renderCartItem(item) {
    const table = document.getElementById("list-carts");

    const tr = document.createElement("tr");
    tr.id = `cart-id-${item.id}`;

    const tdName = document.createElement("td");
    tdName.textContent = item.name;

    const tdPrice = document.createElement("td");
    tdPrice.textContent = `$${item.price}`;

    const tdTotal = document.createElement("td");
    tdTotal.id = `cart-total-${item.id}`;
    tdTotal.textContent = formatTotal(item.total);

    const tdQuantity = document.createElement("td");
    const minus = document.createElement("img");
    minus.src = "public/icon_minus.png"
    minus.onclick = function () {
        updateQuantity(item, -1);
    };
    tdQuantity.appendChild(minus);

    const quantity = document.createElement("span");
    quantity.id = `cart-quantity-${item.id}`;
    quantity.textContent = item.quantity;
    tdQuantity.appendChild(quantity);

    const add = document.createElement("img");
    add.src = "public/icon_plus.png"
    add.onclick = function () {
        updateQuantity(item, 1);
    };
    tdQuantity.appendChild(add);

    tr.appendChild(tdName);
    tr.appendChild(tdPrice);
    tr.appendChild(tdTotal);
    tr.appendChild(tdQuantity);

    table.appendChild(tr);
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

function formatTotal(cost) {
    return `$${(Math.round(cost * 100) / 100).toFixed(2)}`;
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

function loadUICarts(isShow) {
    if (isShow) {
        document.getElementById("cart-empty").style.display = 'none';
        document.getElementById("cart-product").style.display = 'block';
    } else {
        document.getElementById("cart-empty").style.display = 'block';
        document.getElementById("cart-product").style.display = 'none';
    }
}

function loadUIEmptyCart() {
    document.getElementById("cart-empty").style.display = 'block';
    document.getElementById("cart-product").style.display = 'none';
}

function showErrorLogin() {
    document.getElementById('error-login').style.display = 'block';
}

function hideErrorLogin() {
    document.getElementById('error-login').style.display = 'none';
}

function showAlertError(error) {
    if (error === 'no-access-token') {
        alert('No Access Token!');
        logout();
    }
    if (error === 'out-of-stock') {
        alert('Out Of Stock!');
    }
    if (error === 'cart-empty') {
        alert('Cart Empty!');
    }
    if (error === 'order-fail') {
        alert('Place Order Fail!');
    }
}