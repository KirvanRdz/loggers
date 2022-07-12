import moment from 'moment';
import  {DBServiceSQL}  from '../services/dbChat';


class Chat {
  constructor(nombreTabla) {
    this.tabla = nombreTabla;
  }


  async save(miObjeto) {
    const chatNuevo = {
      email: miObjeto.email,
      fecha: moment().format('DD/MM/YYYY h:mm:ss a'),
      mensaje: miObjeto.mensaje,
    };

    await DBServiceSQL.create(this.tabla, chatNuevo);

    return chatNuevo;
  }


  async getAll() {
    const chats = await DBServiceSQL.get(this.tabla);

    return chats;
  }
  
}

export const ChatController = new Chat('mensajes');

