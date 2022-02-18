const express = require('express')
const path = require('path')
const http = require('http')
const { Server } = require('socket.io')

const Bandas = [
    { id: 1, name: 'Deep Purple' },
    { id: 2, name: 'Pink Floyd' },
    { id: 3, name: 'The Doors' },
    { id: 4, name: 'The Beatles' },
    { id: 5, name: 'Soda Stereo' },
    { id: 6, name: 'Dire Straits' }
]

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use('/static', express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')))

const socketPool = {}

io.on('connection', (socket) => {
    console.log(`Un nuevo usuario se ha conectado, id: ${socket.id}`)
    socketPool[socket.id] = 0
    const time = 1000
    for(let i = 0; i < 3; i++){
        socketPool[socket.id] = i
        setTimeout(() => socket.emit("Banda", Bandas[i]), time * (i + 1))
    }

    socket.on('more', () => {
        const i = socketPool[socket.id]
        const next = i + 1
        setTimeout(() => socket.emit('Banda', Bandas[next]), 1000)
        socketPool[socket.id] = next
    })
})

server.listen(8080, () => console.log("Escuchando servidor en el puerto 8080"))