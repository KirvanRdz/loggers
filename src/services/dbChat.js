import knex from 'knex';

const sqlite3Config = {
	client: 'sqlite3',
	connection: { filename: './myDB.sqlite' },
	useNullAsDefault: true,
};

class DB {
  constructor() {
    this.connection = knex(sqlite3Config)
  }

  init() {
    this.connection.schema.hasTable('mensajes').then((exists) => {
      if (exists) return;
      console.log('Creamos la tabla mensajes!');

      return this.connection.schema.createTable(
        'mensajes',
        async (mensajesTable) => {
          mensajesTable.increments('id');
          mensajesTable.string('email').notNullable();
          mensajesTable.string('fecha').notNullable();
          mensajesTable.string('mensaje').notNullable();
         
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
export const DBServiceSQL = new DB();

