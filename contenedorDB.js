const knex = require('knex');

class ContenedorDB {
    constructor (config, table) {
        this.conexion = knex(config);
        this.table = table;
    }
    
    async save (elemento) {
        try {
            const data = await this.conexion(this.table).insert(elemento);
            console.log('data: ', data);
            return data;
        }
        catch(error) {
            console.error('Error: ', error);
        }
        finally {
            // knex.destroy();
        }
    }

    async getById (id) {
        try {
            const data = await this.conexion.from(this.table)
                .select('*').where('id_producto', '=', id);
            return data[0];
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async getAll () {
        try{
            const registros = await this.conexion.from(this.table)
                .select('*');
            console.log('Registros: ', { registros })
            return registros;
        }
        catch(error) {
            console.error('Error: ', error);
        }
    }

    async deleteById (id) {
        try {
            await this.conexion.from(this.table)
                .where('id_producto', '=', id).delete();
            const registros = await this.conexion.from(this.table)
                .select('*');
            return registros;
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async deleteAll () {
        try{
            await this.conexion.from(this.table)
            .delete();
        }
        catch(error) {
            console.error('Error: ', error);
        }
    }

    async update (id, producto) {
        const list = await this.getAll();

        const productSaved = list.find(item => item.id === parseInt(id));
        const productIndex = list.findIndex(item => item.id === parseInt(id));

        if (!productSaved) {
            console.error(`Producto con id: ${id} no fue encontrado`);
            return null;
        }

        const productUpdated = {
            ...productSaved,
            ...producto
        };

        list[productIndex] = productUpdated;

        const productsString = JSON.stringify(list, null, 2);
        await fs.promises.writeFile(`./${this.file}`, productsString, 'utf-8');

        return productUpdated;
    }
}

module.exports = ContenedorDB;