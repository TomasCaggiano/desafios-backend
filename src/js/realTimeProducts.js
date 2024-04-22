const socket = io()

const input = document.getElementById('agregar')

const nuevoProducto = document.getElementById('productoAgregado')

input.addEventListener('keyup', evt =>{
    if(evt.key === 'enter'){
        socket.emit('tituloAgregado', input.value)
        input.value = ''
    }
})

socket.on('realTimeProducts', data =>{
    console.log(data)
})