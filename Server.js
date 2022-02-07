const { urlencoded } = require('express')
const express = require('express')
const Container = require('./Contenedor')
const productRouter = require('./Routes/products')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', productRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})