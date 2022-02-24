const express = require('express');
const server = express();

const { createServer } = require('http');
const { Server } = require('socket.io');
const Contenedor = require('./Contenedor');

const { getMessages, saveMessage } = require('./data/chats.js');

const httpServer = createServer(server);
const io = new Server(httpServer);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use( express.static('public') );


server.set('view engine', 'ejs');

const PORT = 8080;
const productosContenedor = new Contenedor('./data/products.json');

io.on('connection', async socket => {
  console.log(`¡Nuevo cliente conectado! socketid: ${socket.id}`);
  const products = await productosContenedor.getAll();
  io.sockets.emit('products', products);

  socket.on('new-product', async product => {
    await productosContenedor.save(product);
    products = await productosContenedor.getAll();
    console.log('PRODUCTOS', products)
    io.sockets.emit('products', products);
  });

  const messages = getMessages();
  socket.emit('messages', messages);

  socket.on('new-message', message => {
    saveMessage(message);
    const messages = getMessages();
    io.sockets.emit('messages', messages);
});
});

server.get('/' , (req, res) => {
  res.render('../views/pages/index')
});

server.get('/lista-productos', async (req, res) => {
  const lista = await productosContenedor.getAll();
  res.render('../views/pages/lista-productos', {
    message: 'success',
    data: lista
  });
})

server.post('/api/products', async (req, res) => {
  
  const nuevoProducto = req.body;

  const idProductoGuardado = await productosContenedor.save(nuevoProducto);

    res.redirect('/lista-productos')

    res.send({
      message: 'Producto guardado',
      data: {
        ...nuevoProducto,
        id: idProductoGuardado
      }
  });

})


const http = httpServer.listen(PORT, () => 
    console.log(`Servidor abierto en http://localhost:${PORT}/`)
)

http.on('error', error => console.log('Error en servidor:', error));