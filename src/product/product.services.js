const prisma = require("../lib");

const getAllProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
};
 
const getProductById = async (id) => {
    if (typeof id !== "number") {
        throw new Error("ID harus berupa angka");
    }
    const product = await prisma.product.findUnique({ //findUnique untuk mencari data yang unik
        where: {
            id,
        },
    });

    if (!product) {
        throw new Error("Product tidak ditemukan");
    }
    return product;
}

const createProduct = async (productData) =>{
const product = await prisma.product.create({
    data:{
        name: productData.name,
        price: productData.price,
        description: productData.description,
        image: productData.image,
    },
    })

}


module.exports = {
    getAllProducts,
    getProductById,
}