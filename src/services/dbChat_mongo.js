
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

const productoSchema = new mongoose.Schema({
  author:
    {
      id: { type: String, required: true },
      nombre: { type: String, required: true },
      apellido: { type: String, required: true },
      edad: { type: Number, required: true },
      alias: { type: String, required: true },
      avatar: { type: String,  required: true },
    },
  
  text: { type: String, required: true },
  
},
{versionKey:false , timestamps:true},
);


class DB {

  constructor() {
    this.srv = process.env.MONGO_SRV || 'ejemplo';
    mongoose.connect(this.srv);
    this.productos = mongoose.model('chats', productoSchema);
  }

 
  getAll() {
    return this.productos.find();
  }

  getId(id) {
    return this.productos.findById(id);
  }

  create(data) {
    return this.productos.create(data);
  }

  update(id, data) {
    return this.productos.findByIdAndUpdate(id, data, { new: true });
  }

}

export const DBServiceMongo = new DB();

