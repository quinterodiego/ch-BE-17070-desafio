const fs = require('fs');

class Contenedor {
    constructor (file) {
        this.file = file;
    }

    async save (producto) {

        try{
            const data = await fs.promises.readFile(`./${this.file}`, 'utf-8');
            const productos = JSON.parse(data);
            let listaProductos = [];

            const d = new Date();
            const date = [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/') + ' ' + [d.getHours(),d.getMinutes(),d.getSeconds()].join(':');
    
            if(productos.length == 0){
                producto.id = 1;
                producto.timestamp = date;
                listaProductos.push(producto);
            }else{       
                producto.id = productos[productos.length - 1].id + 1;
                producto.timestamp = date;
                productos.push(producto);
                listaProductos = productos;
            }
    
            const productoString  = JSON.stringify(listaProductos, null, 2);
            await fs.promises.writeFile(`./${this.file}`, productoString, 'utf-8');

            return producto.id;
        }
        catch(error) {
            console.error('Error: ', error);
        }

    }

    async getById (id) {
        try {
            const data = await fs.promises.readFile(`./${this.file}`, 'utf-8');
            const productos = JSON.parse(data);
            const productoEncontrado = productos.find(producto => producto.id === parseInt(id));
            return productoEncontrado;
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async getAll () {
        try{
            const data = await fs.promises.readFile(`./${this.file}`, 'utf-8');
            const productos = JSON.parse(data);
            return productos;
        }
        catch(error) {
            console.error('Error: ', error);
        }
    }

    async deleteById (id) {
        try {
            const data = await fs.promises.readFile(`./${this.file}`, 'utf-8');
            const productos = JSON.parse(data);
            const nuevosProductos = productos.filter(producto => producto.id !== parseInt(id));
            
            const productsString = JSON.stringify(nuevosProductos, null, 2);
            await fs.promises.writeFile(`./${this.file}`, productsString, 'utf-8');
            return nuevosProductos;
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async deleteAll () {
        try{
            await fs.promises.writeFile(`./${this.file}`, '', 'utf-8');
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

module.exports = Contenedor;