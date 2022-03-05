const express = require('express');
const server = express();

const productosRouter = require('./routers/productos');
const cargaRouter = require('./routers/charge');
const cartRouter = require('./routers/cart');

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/carga', cargaRouter);
server.use('/productos', productosRouter);
server.use('/carrito', cartRouter);

server.set('view engine', 'ejs');

const PORT = 8080;

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

server.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));