const Contenedor = require('../contenedorDB');
const { optionsMySQL } = require('../DB/options/mysql');
const cargaContenedor = new Contenedor(optionsMySQL, 'tb_productos');

const addProduct = async (product) => {
    const productID = await cargaContenedor.save(product);
    return productID;
}

module.exports = {
    addProduct
}