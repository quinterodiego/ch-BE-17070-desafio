const Contenedor = require('../contenedor');
const cargaContenedor = new Contenedor('./data/products.json');

const addProduct = async (product) => {
    const productID = await cargaContenedor.save(product);
    return productID;
}

module.exports = {
    addProduct
}