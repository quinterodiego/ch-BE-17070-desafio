const express = require('express');
const isAdmin = require('./../middlewares/isAdmin');
const { addProduct } = require('../models/charge');
const cargaRouter = express.Router();

cargaRouter.post('/', isAdmin, async (req, res) => {
    const newProduct = req.body;
    const productoSavedID = await addProduct(newProduct);
    console.log('Producto agregado - ID: ', productoSavedID);
    res.redirect('http://localhost:8080/productos');
});

module.exports = cargaRouter;