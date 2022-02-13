const express = require('express')
const path = require('path')
const productRouter = require('./Routes/products')
const { engine } = require('express-handlebars')
const products = require('./products')

const app = express()

app.engine('handlebars', engine({
    layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static/', express.static(path.join(__dirname, 'public')))

// app.use('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')))
app.get('/', (req, res) => res.render('main', { layout: 'index', products }))
app.use('/api/productos', productRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})