const socket = io()

const list = document.getElementById("bandas")
const addMore = document.getElementById("addMore")

socket.on("Banda", (data) => {

    const liElement = document.createElement('li')
    liElement.innerHTML = data.name
    list.appendChild(liElement)
})

addMore.addEventListener('click', (e) => {
    e.preventDefault()
    console.log('click')
    socket.emit('more', null)
})