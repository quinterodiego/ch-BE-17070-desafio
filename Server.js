const express = require('express')
const app = express()

const Container = require('./Contenedor')

const products = new Container('productos.json')

app.get('/productos', async (req, res) => {
    try {
        const data = await products.getAll()
        res.send(JSON.parse(data))
    } catch (error) {
        console.log(error)
    }
})

app.get('/productoRandom', async (req, res) => {
    try {
        const str = await products.getAll()
        const data = JSON.parse(str)
        const idRandom = Math.floor(Math.random() * 3) + 1
        const productoRandom = data.find((p) => p.id === idRandom)
        res.send(productoRandom)
    } catch (error) {
        console.log(error)
    }
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})