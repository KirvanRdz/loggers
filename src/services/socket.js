import socketIo from 'socket.io';
import { ProductosController } from '../controller/productos';
import { ChatControllerMongo }  from '../controller/chat_mongo';


let io;

export const initWsServer = (server) => {
  io = socketIo(server);

  io.on('connection', (socket) => {
    //console.log('Nueva Conexion establecida!');
    //console.log(new Date());

    socket.on('allProducts', async () => {
      const productos = await ProductosController.getAll();

      productos.forEach((unProducto) => {
        socket.emit('producto', unProducto);
      });
    });

    socket.on('allChat', async () => {
      const chats = await ChatControllerMongo.getAll();

      
      socket.emit('chat', chats);
      
    });

    socket.on('chatMessage', async (unChat) => {
      const chat = await ChatControllerMongo.save(unChat);
      //console.log(chat)
      io.emit('newchat', chat);
     
    });

    
  });

  return io;
};

export const socketEmit = (eventName, message) => {
  io.emit(eventName, message);
};
