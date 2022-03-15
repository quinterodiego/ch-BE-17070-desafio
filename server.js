const express = require('express');
const server = express();
const { createServer } = require('http');
const { Server } = require('socket.io');

const productosRouter = require('./routers/productos');
const cargaRouter = require('./routers/charge');
const cartRouter = require('./routers/cart');

const { getMessages, saveMessage } = require('./models/chats');

const httpServer = createServer(server);
const io = new Server(httpServer);

server.use( express.static('public') );

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/carga', cargaRouter);
server.use('/productos', productosRouter);
server.use('/carrito', cartRouter);

server.set('view engine', 'ejs');

const PORT = 3000;

io.on('connection', async socket => {
  console.log(`¡Nuevo cliente conectado! socketid: ${socket.id}`);


  const messages = await getMessages();
  console.log('Mensajes:', { messages })
  socket.emit('messages', messages);

  socket.on('new-message', async message => {
    await saveMessage(message);
    const messages = await getMessages();
    io.sockets.emit('messages', messages);
  });
});

server.get('/', (req, res) => {
  res.render('pages/index');
});

server.get('/carga', (req, res) => {
  res.render('pages/carga');
});

server.get('/productos', (req, res) => {
  res.render('pages/productos');
});


server.get('/carrito', (req, res) => {
  res.render('pages/carrito');
});

const http = httpServer.listen(PORT, () => 
    console.log(`Servidor abierto en http://localhost:${PORT}/`)
)

http.on('error', error => console.log('Error en servidor:', error));