//functionya re-usable

const { findProduct, findProductByName, findProductById, insertProduct, deleteProduct, editProduct} = require("./product.repository");
const {} = require("./product.services");


const getAllProducts = async () => {
    const products = await findProduct();
    return products;
};

const getProductById = async (id) => {
    const product = await findProductById(id);
    if (!product) {
        throw new Error("Product tidak ditemukan");
    }
    return product;
}

const createProduct = async (productData) => {
    //validasi apakah nama produk sudah ada
    const productName = await findProductByName(productData.name);
    if(productName) {
        throw new Error("Product sudah ada");
    }
    const product = await insertProduct(productData);
    return product;
}

const deleteProductById = async (id) => {
    await getProductById(id);
    await deleteProduct(id);
};

const updateProduct = async (id, productData) => {
    await getProductById(id);
    const product = await editProduct(id, productData);
    return product;
};


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProductById,
    updateProduct,

}