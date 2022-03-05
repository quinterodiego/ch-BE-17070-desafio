const express = require('express');
const isAdmin = require('./../middlewares/isAdmin');
const { getProducts, getProductById, updateProductById, deleteProductById } = require('../models/productos');

const productosRouter = express.Router();

productosRouter.get('/', async (req, res) => {
    const lista = await getProducts();
    res.render('pages/productos', {
        lista
    });
});

productosRouter.get('/:id', async (req, res) => {
    const productoId = req.params.id;
    const producto = await getProductById(productoId);
    res.send({ 
        message: 'success',
        data: producto
    });
});

productosRouter.put('/:id', isAdmin, async (req, res) => {
    const productoId = req.params.id
    const producto = req.body;
    const productoUpdated = await updateProductById(productoId, producto);

    if (!productoUpdated) {
        res.send({
            message: 'Operation wrongt',
            data: productoUpdated
        })
    } else {
        res.send({
            message: 'Operation successfull',
            data: productoUpdated
        })
    }

    res.send({
        message: "operation successfull",
        data: productoUpdated
    })
});

productosRouter.delete('/:id', isAdmin, async (req, res) => {
    const productoId = req.params.id;
    const newProducts = await deleteProductById(productoId);

    if (!newProducts) {
        res.send({
            message: 'Operation wrongt',
            data: newProducts
        })
    } else {
        res.send({
            message: 'Operation successfull',
            data: newProducts
        })
    }

    res.send({
        message: "operation successfull",
        data: newProducts
    })
});

module.exports = productosRouter;