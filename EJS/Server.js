const express = require('express')
const path = require('path')
const productRouter = require('./Routes/products')
const ejsEngine = require('./engine/ejs')

const app = express()

ejsEngine(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static/', express.static(path.join(__dirname, 'public')))
// app.use('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')))

app.use('/', productRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})