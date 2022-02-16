const express = require('express')
const productsContainer = require('../models/Product')

const { Router } = express
const products = new productsContainer('./../db/products.json')
const router = Router()

router.get('/productos', async (req, res) => {
    const productsList = await products.getAll()
    res.render('productos', { products: JSON.parse(productsList) })
})

// -------------- EJS --------------
router.get('/', (req, res) => res.render('index'))

router.post('/', async (req, res) => {
    const { title, price, thumbnail } = req.body
    await products.save({
        "title": title,
        "price": parseInt(price),
        "thumbnail": thumbnail
    })
    res.redirect('/')
})

router.put('/:id', async (req, res) => {
    const { id } = req.params

    const product = await products.getById(parseInt(id))        
    if(!product){
        res.status(404).send({
            error: "Producto no encontrado"
        })
        return
    }

    const { title, price, thumbnail } = req.body
    await products.updateById({
        "id": parseInt(id),
        "title": title,
        "price": price,
        "thumbnail": thumbnail
    })
    res.send({
        "Producto actualizado": id
    })
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    const product = await products.getById(parseInt(id))        
    if(!product){
        res.status(404).send({
            error: "Producto no encontrado"
        })
        return
    }

    await products.deleteById(parseInt(id))
    res.send({
        "mensaje": "Producto borrado"
    })
})

module.exports = router