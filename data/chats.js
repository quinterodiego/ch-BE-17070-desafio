let chats = [
    { email: "juan@juan.com.ar", fechaHora: "25/10/21 22:50:45", mensaje: "¡Hola! ¿Que tal?" },
    { email: "pedro@pedro.com.ar",fechaHora: "25/10/21 22:50:45",  mensaje: "¡Muy bien! ¿Y vos?" },
    { email: "ana@ana.com.ar", fechaHora: "25/10/21 22:50:45", mensaje: "¡Genial!" }
];

const getMessages = () => chats;

const saveMessage = message => {
    chats.push(message);
}

module.exports = {
    getMessages,
    saveMessage
};