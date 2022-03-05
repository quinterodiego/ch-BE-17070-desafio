const express = require('express');
const { createCart, deleteCartById, getCarts, getCartById, addToCart, deleteProductById } = require('../models/cart');
const cartRouter = express.Router();

cartRouter.get('/', async (req, res) => {
    const lista = await getCarts();
        res.render('pages/productos', {
        lista
    });
});

cartRouter.post('/', async (req, res) => {
    const cart = req.body;
    const idCartSaved = await createCart(cart);

    res.send({ data: idCartSaved });
});

cartRouter.delete('/:id', async (req, res) => {
    const cartId = req.params.id;
    const newCarts = await deleteCartById(cartId);

    if (!newCarts) {
        res.send({
            message: 'Operation wrongt',
            data: newCarts
        })
    } else {
        res.send({
            message: 'Operation successfull',
            data: newCarts
        })
    }

    res.send({
        message: "operation successfull",
        data: newCarts
    });
});

cartRouter.get('/:id/productos', async (req, res) => {
    const cartId = req.params.id;
    const { products } = await getCartById(cartId);

    res.render('pages/carrito', {
        products
    });
});

cartRouter.post('/:id/productos', async (req, res) => {
    const idCart = req.params.id;
    const newCart = req.body;
    const idCartAdded = await addToCart(idCart, newCart);

    res.send({ data: idCartAdded });
});

cartRouter.delete('/:id/productos/:id_producto', async (req, res) => {
    const idCart = req.params.id;
    const idProduct= req.params.id_producto;
    console.log('id Producto: ', idProduct);
    const idCartAdded = await deleteProductById(idCart, idProduct);

    res.send({ newProducts: idCartAdded });
});

module.exports = cartRouter;