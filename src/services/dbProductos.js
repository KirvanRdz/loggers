import knex from 'knex';

const mySqlConfig = {
	client: 'mysql',
	connection: {
		host: '127.0.0.1',
		user: 'root',
		port: 30006,
		password: '',
		database: 'ccinetto',
	},
};

class DB {
  constructor() {
    this.connection = knex(mySqlConfig)
  }

  init() {

    this.connection.schema.hasTable('productos').then((exists) => {
      if (exists) return;
      console.log('Creamos la tabla productos!');

      return this.connection.schema.createTable(
        'productos',
        async (productosTable) => {
          productosTable.increments('id');
          productosTable.string('nombre').notNullable();
          productosTable.decimal('precio').notNullable();
          productosTable.string('url').notNullable();
        }
      );
    });
  }

  get(tableName, id) {
    if (id) return this.connection(tableName).where('id', id);

    return this.connection(tableName);
  }

  create(tableName, data) {
    return this.connection(tableName).insert(data);
  }

  update(tableName, id, data) {
    return this.connection(tableName).where('id', id).update(data);
  }

  delete(tableName, id) {
    return this.connection(tableName).where('id', id).del();
  }
}

export const DBServiceMDB = new DB();