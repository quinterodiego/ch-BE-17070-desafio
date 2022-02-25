const socket = io.connect();

const form = document.getElementById('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const url = document.getElementById('url').value;
    socket.emit('new-product', {nombre, precio, url});
    document.getElementById('nombre').value = "";
    precio = document.getElementById('precio').value = "";
    url = document.getElementById('url').value = "";
});

socket.on('products', (products) => {
    const productList = products.map((product) => `
        <div class="card align-items-center flex-row m-3" style="width: 100%;">
            <img class="card-img-top w-25" src=${product.url} alt="Card image cap">
            <div class="card-body">
                <h3 class="card-title">Nombre: ${product.nombre}</h3>
                <h5 class="card-title">Precio: ${product.precio}</h5>
            </div>
        </div>
    `).join(' ');

    const list = document.getElementById('lista-productos');

    list.innerHTML = productList;
});

const render = (data) => {
    const html = data.map((element, index) => {
        return (`
            <div>
                <strong>${element.email}</strong>
                <strong>[${element.fechaHora}]</strong>:
                <em>${element.mensaje}</em>
            </div>
        `);
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
};

const addMessage = (event) => {
    event.preventDefault();
    const d = new Date();
    dformat = [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/') + ' ' + [d.getHours(),d.getMinutes(),d.getSeconds()].join(':');

    const mensaje = {
        email: document.getElementById('email').value,
        fechaHora: dformat,
        mensaje: document.getElementById('mensaje').value
    };
    socket.emit('new-message', mensaje);
    return false;
}

const formChats = document.getElementById('formChats');
formChats.addEventListener('submit', addMessage);

socket.on('messages', (data) => render(data));