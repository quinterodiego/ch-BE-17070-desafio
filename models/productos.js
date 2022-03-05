const Contenedor = require('../contenedor');
const productosContenedor = new Contenedor('./data/products.json');

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