const express = require('express');
const Contenedor = require('../contenedor');

const productosRouter = express.Router();

const productosContenedor = new Contenedor('./data/products.json');


productosRouter.get('/', async (req, res) => {
    const lista = await productosContenedor.getAll();
    res.render('layouts/productos', {
    lista
    });
});

productosRouter.get('/:id', async (req, res) => {
    const productoId = req.params.id;
    const producto = await productosContenedor.getById(productoId);
    console.log(producto);
    res.send({ 
        message: 'success',
        data: producto
    });
});

productosRouter.post('/', async (req, res) => {
    const newProduct = req.body;
    console.log({ newProduct });
    const productoSavedID = await productosContenedor.save(newProduct);
    res.redirect('/list-productos');
});

productosRouter.put('/:id', async (req, res) => {
    const productoId = req.params.id
    const producto = req.body;
    const userUpdated = await productosContenedor.update(productoId, producto);

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

productosRouter.delete('/:id', async (req, res) => {
    const productoId = req.params.id;
    const newProducts = await productosContenedor.deleteById(productoId);

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