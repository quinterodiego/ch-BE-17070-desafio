const socket = io.connect();

const render = (data) => {
    console.log("Data De mensajes: ", data);
    const html = data.entities.messages.mensajes.mensajes.messages.map((element, index) => {
        return (`
            <div>
                <strong>${element.author.id}</strong>
                <strong>[${element.author.apellido}]</strong>:
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
        timestamp: dformat,
        mensaje: document.getElementById('mensaje').value
    };

    document.getElementById('email').value = "";
    document.getElementById('mensaje').value = "";
    socket.emit('new-message', mensaje);
    return false;
}

const formChats = document.getElementById('formChats');
formChats.addEventListener('submit', addMessage);

const schemaAuthor = new normalizr.schema.Entity('author', {}, { idAttribute: 'email' });  

const schemaMessage = new normalizr.schema.Entity('message', {
    author: schemaAuthor
});

const schemaMessages = new normalizr.schema.Entity('messages', {
    messages: [schemaMessage]
});

socket.on('messages', (data) => {
    const dataDeNormalized = normalizr.denormalize(data.result, schemaMessages, data.entities);
    console.log(dataDeNormalized);
    render(data)
});