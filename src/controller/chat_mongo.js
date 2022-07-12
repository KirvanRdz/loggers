
import  {DBServiceMongo} from '../services/dbChat_mongo';
import { normalize, schema } from 'normalizr';
import * as util from 'util';

class Chat {
  constructor() {
    this.author = new schema.Entity('author', {}, { idAttribute: 'id' });

    const msge = new schema.Entity(
                          'mensajes',
                          {
                            author: this.author,
                          },
                          { idAttribute: '_id' }
                        );

    this.msgesSchema = new schema.Array(msge);
  }


  async save(chatNuevo) {
    

    await DBServiceMongo.create(chatNuevo);
    console.log(chatNuevo)
    return chatNuevo;
  }


  async getAll() {
    const chats = await DBServiceMongo.getAll().lean();
    let normalizedMessages = normalize(chats, this.msgesSchema);
    //console.log(util.inspect(normalizedMessages, true, 3, true));
    return normalizedMessages;
   
  }
  
}

export const ChatControllerMongo = new Chat();
