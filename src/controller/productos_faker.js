
import { faker } from '@faker-js/faker';

faker.locale = 'en';
//Esto solo va a funcionar si el archivo ya existe
class Productos {

 
  async getAll() {
    let data = {productos:[]}
    for(let i =0; i<10; i++){
      data.productos.push({
          nombre: faker.vehicle.vehicle(),
          precio: faker.finance.amount(),
          url: faker.image.imageUrl()
      })
  }

    return data;
  }

  
}

export const ProductosFakerController = new Productos();

