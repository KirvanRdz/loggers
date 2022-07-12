
import  {DBServiceMDB}  from'../services/dbProductos';


//Esto solo va a funcionar si el archivo ya existe
class Productos {
  constructor(nombreTabla) {
    this.tabla = nombreTabla;
  }


  async save(miObjeto) {

    const productoNuevo = {
      nombre: miObjeto.nombre,
      precio: miObjeto.precio,
      url: miObjeto.url,
    };


    await DBServiceMDB.create(this.tabla, productoNuevo);

    return productoNuevo;
  }

  async getById(number) {
    const producto = await DBServiceMDB.get(this.tabla,number);

    return producto;
  }

  async getAll() {
    const productos = await DBServiceMDB.get(this.tabla);

    return productos;
  }

  async deleteById(number) {
    await DBServiceMDB.delete(this.tabla,number);
  }

  async deleteAll() {
    await DBServiceMDB.delete(this.tabla);
  }

  async Update(id, nuevaData) {

    const productUpdated = {
      id,
      ...nuevaData,
    };


    await DBServiceMDB.update(this.tabla,id,nuevaData);

    return productUpdated;
  }
}

export const ProductosController = new Productos('productos');

