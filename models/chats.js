const mensajes = [
  { email: "juan@juan.com.ar", fechaHora: "25/10/21 22:50:45", mensaje: "¡Hola! ¿Que tal?" },
  { email: "pedro@pedro.com.ar",fechaHora: "25/10/21 22:50:45",  mensaje: "¡Muy bien! ¿Y vos?" },
  { email: "ana@ana.com.ar", fechaHora: "25/10/21 22:50:45", mensaje: "¡Genial!" }
];

const Contenedor = require('../contenedorDB');
const { optionsSQLite } = require('./databases');

const contenedorMensajes = new Contenedor(optionsSQLite,'tb_mensajes');
console.log(optionsSQLite)

const getMessages = async () => {
return await contenedorMensajes.getAll();
};

const saveMessage = async (message) => {
const idMessage = await contenedorMensajes.save(message);
return idMessage;
}

module.exports = {
getMessages,
saveMessage
};