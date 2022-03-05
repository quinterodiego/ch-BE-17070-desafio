const Contenedor = require('../contenedor');

const cartContenedor = new Contenedor('./data/carts.json');

const createCart = async (product) => {
    const idProductUpdated = await cartContenedor.save(product);
    return idProductUpdated;
}

const getCarts = async () => {
    const listCarts = await cartContenedor.getAll();
    return listCarts;
}

const deleteCartById = async (id) => {
    carts = cartContenedor.deleteById(id);
    return carts;
}

const getCartById = async (id) => {
    const cart = await cartContenedor.getById(id);
    return cart;
}

const addToCart = async (idCart, newProduct) => {
    const { products, id, timestamp } = await cartContenedor.getById(idCart);
    const cartUpdated = {
        products: [
            ...products,
            newProduct
        ],
        id: id,
        timestamp: timestamp
    };

    const updated = await cartContenedor.update(idCart, cartUpdated);
    return updated;
}

const deleteProductById = async (idCart, idProduct) => {
    const { products, id, timestamp } = await cartContenedor.getById(idCart);
    const newProducts = products.filter(product => product.id != idProduct);
    const cartUpdated = {
        products:
            newProducts
        ,
        id: id,
        timestamp: timestamp
    }

    const updated = await cartContenedor.update(idCart, cartUpdated);
    return updated;
}

module.exports = {
    createCart,
    deleteCartById,
    getCarts,
    getCartById,
    addToCart,
    deleteProductById
};