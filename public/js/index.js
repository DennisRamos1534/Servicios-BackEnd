
document.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:3000/api/login/adminrenovar';
    const token = localStorage.getItem('x-token');

    try {
        const resp = await fetch(url, { 
            method: 'GET',
            headers: {
                'x-token': token,
                'Content-Type': 'application/json',
            }
        });
        const resultado = await resp.json();
        if(resultado['ok'] == false) {
            localStorage.removeItem('x-token');
            window.location.href = '/login.html';
            return;
        } else {
            localStorage.setItem('x-token', resultado['token']);
        }
    } catch (error) {
        console.log(error);
    }
});

const socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor');

});

socket.on('disconnect', function() {
    console.log('Perdimos comunicación con el servidor');
});


// socket.emit('mensaje', { nombre: 'Fernando' } );
const direccion = document.querySelector('.socketh1');
const descripcion = document.querySelector('.socket3');

socket.on('pruebaservidor', function( payload ){
    console.log('Escuhando:', payload );
    direccion.innerHTML = payload.direccion;
    descripcion.innerHTML = payload.descripcion;
});


const formprincipal = document.querySelector('.form-principal');

formprincipal.addEventListener('submit', (e) => {
    e.preventDefault();
    const usuario = document.querySelector('#usuario').value;
    const password = document.querySelector('#password').value;

    if(usuario == '' || password == '') {
        return;
    }

    socket.emit('web', { nombre: usuario, info: password } );
});