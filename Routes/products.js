const express = require('express')
const productsContainer = require('../models/Product')

const { Router } = express
const products = new productsContainer('./../db/products.json')
const router = Router()

router.get('/', async (req, res) => {
    const productsList = await products.getAll()
    res.render('index', { products: JSON.parse(productsList) })
})

// router.get('/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         const product = await products.getById(parseInt(id))
        
//         if(!product){
//             res.status(404).send({
//                 error: "Producto noo encontrado"
//             })
//             return
//         }

//         res.send(product)
//     } catch (error) {
//         console.log(error)
//     }
// })

// -------------- PUG --------------
// router.get('/add', (req, res) => res.render('addProduct'))

// router.post('/add', async (req, res) => {
//     const { title, price, thumbnail } = req.body
//     await products.save({
//         "title": title,
//         "price": parseInt(price),
//         "thumbnail": thumbnail
//     })
//     res.redirect('/add')
// })

// -------------- EJS --------------
router.get('/add', (req, res) => res.render('addProduct'))

router.post('/add', async (req, res) => {
    const { title, price, thumbnail } = req.body
    await products.save({
        "title": title,
        "price": parseInt(price),
        "thumbnail": thumbnail
    })
    res.redirect('/add')
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