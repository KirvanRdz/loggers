import { denormalizeData } from "./normalizer.js";

const table = document.getElementById('myTable');
const submitButton = document.getElementById('Submit');
const nombre = document.getElementById('nombre');
const precio = document.getElementById('precio');
const urlFoto = document.getElementById('url');
const chatForm = document.getElementById('chat-form');

//para el chat
const chatMessages = document.querySelector('.chat-messages');
const email = document.getElementById('email');
const nombreChat = document.getElementById('nombreChat');
const apellido = document.getElementById('apellido');
const edad = document.getElementById('edad');
const alias = document.getElementById('alias');
const avatar = document.getElementById('avatar');

const mensaje = document.getElementById('mensaje');


async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const socket = io();

//socket.emit('allProducts');
socket.emit('allChat');

socket.on('producto', (unProducto) => {
  attachRow(unProducto);
});

socket.on('chat', (unChat) => {
  //console.log(unChat);
  console.log('denormalized data');
	const denormalizedData = denormalizeData(unChat)
  console.log(denormalizedData);
  outputMessage(denormalizedData);
  //Automatically scroll down to the last message
  chatMessages.scrollTop = chatMessages.scrollHeight;
});


socket.on('newchat', (unChat) => {
  //console.log(unChat);
  console.log('denormalized data');

  console.log(unChat);
  newMessage(unChat);
  //Automatically scroll down to the last message
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

const attachRow = (unProducto) => {
  const fila = document.createElement('tr');
  fila.innerHTML = `<td>${unProducto.nombre}</td><td>${unProducto.precio}</td> <td> <img src= ${unProducto.url} width="50" height="50"></td>`;

  table.appendChild(fila);
};

submitButton.addEventListener('click', async (e) => {
  e.preventDefault();
  
    try {
      const data = {
        nombre: nombre.value,
        precio: precio.value,
        url:  urlFoto.value,
      };
  
      nombre.value=''
      precio.value=''
      urlFoto.value=''
      const url = 'http://localhost:8080/api/productos';
      response = await postData(url, data);
  
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  
  
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  
  if(email.value.trim()) {
    if (!validarEmail(email.value.trim())) return 0
    
    const data = { author:{
      id: email.value,
      nombre: nombreChat.value,
      apellido: apellido.value,
      edad: edad.value,
      alias:alias.value,
      avatar:avatar.value
    },
      text:mensaje.value};
    //Emit Message to the server
    //console.log(data)
    socket.emit('chatMessage', data);

    //Clear submitted message
    mensaje.value = '';
  }else{
    alert("debes ingresar el email");
    email.focus();
  }
});

function outputMessage(message) {
  message.forEach((mensaje) => {
   
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
    <p> <strong>${mensaje.author.id} </strong> [${mensaje.author.nombre}] : <em>${mensaje.text}</em></p>`;

    chatMessages.appendChild(div);
  });
  
}

function newMessage(mensaje) {
   
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
    <p> <strong>${mensaje.author.id} </strong> [${mensaje.author.nombre}] : <em>${mensaje.text}</em></p>`;

    chatMessages.appendChild(div);
 
  
}
function validarEmail(valor) {
  if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)){
    return true
  } else {
   alert("La dirección de email es incorrecta!.");
    email.focus();
    return false
  }
}