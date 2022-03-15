const Contenedor = require('../contenedorDB');
const { optionsMySQL } = require('../DB/options/mysql');
const productosContenedor = new Contenedor(optionsMySQL, 'tb_productos');

const getProducts = async () => {
    const listProducts = await productosContenedor.getAll();
    return listProducts;
}

const getProductById = async (id) => {
    const product = await productosContenedor.getById(id);
    return product;
}

const updateProductById = async (id, product) => {
    const productUpdated = await productosContenedor.update(id, product);
    return productUpdated;
}

const deleteProductById = async (id) => {
    products = productosContenedor.deleteById(id);
    return products;
}

module.exports = {
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById
};