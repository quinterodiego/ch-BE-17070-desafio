const express = require('express')
const Contenedor = require('./../Contenedor')

const { Router } = express
const products = new Contenedor('productos.json')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const data = await products.getAll()
        res.send(JSON.parse(data))
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await products.getById(parseInt(id))
        
        if(!product){
            res.status(404).send({
                error: "Producto no encontrado"
            })
            return
        }

        res.send(product)
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    const { title, price, thumbnail } = req.body
    const productID = await products.save({
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