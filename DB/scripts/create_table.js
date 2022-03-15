const { optionsMySQL } = require('../options/mysql');
const { optionsSQLite } = require('../options/sqlite');

const knexMySQL = require('knex')(optionsMySQL);
const knexSQLite = require('knex')(optionsSQLite);

knexMySQL.schema.createTable('tb_productos', (table) => {
    table.increments('id_producto');
    table.string('nombre');
    table.string('descripcion');
    table.integer('codigo');
    table.timestamp('timestamp').defaultTo(knexMySQL.fn.now())
    table.string('url_imagen');
    table.decimal('precio', 12, 2);
    table.integer('stock');
})
    .then(() => console.log('Tabla Productos creada'))
    .catch((error) => { console.error(error); throw error; })
    .finally(() => knexMySQL.destroy())

knexSQLite.schema.createTable('tb_mensajes', (table) => {
    table.increments('id_id_mensaje');
    table.string('email');
    table.timestamp('timestamp').defaultTo(knexSQLite.fn.now())
    table.string('mensaje');
})
    .then(() => console.log('Tabla Mensajes creada'))
    .catch((error) => { console.error(error); throw error; })
    .finally(() => knexSQLite.destroy())