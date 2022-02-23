const express = require('express')
const path = require('path')
const productRouter = require('./Routes/products')
const { engine } = require('express-handlebars')

const app = express()

app.engine('handlebars', engine({
    layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static/', express.static(path.join(__dirname, 'public')))

app.use('/', productRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})