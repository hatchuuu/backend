//berkomunikasi dengan database
//dapat menggunakan orm atau query raw
//supaya untuk mengganti ORM tinggal ganti pada file ini aja kok

const prisma = require("../lib");

const findProduct = async () => {
    const product = await prisma.product.findMany();
    return product;
}

const findProductByName = async (name) => {
    const product = await prisma.product.findFirst({
        where: {
            name,
        }
    });
    return product;
}

const findProductById = async (id) => {
    const product = await prisma.product.findUnique({
        where: {
            id,
        }
    });
    return product;
}

const insertProduct = async (productData) => {
    const product = await prisma.product.create({
        data: {
            name: productData.name,
            price: productData.price,
            description: productData.description,
            image: productData.image,
        },
    });
    return product;
};

const deleteProduct = async (id) => {
    await prisma.product.delete({
        where: {
            id,
        },
    });
};

const editProduct = async (id, productData) => {
    const product = await prisma.product.update({
        where: {
            id,
        },
        data: {
            name: productData.name,
            price: productData.price,
            description: productData.description,
            image: productData.image,
        },
    });
    return product;
};  


module.exports = {
    findProduct,
    findProductByName,
    findProductById,
    insertProduct,
    deleteProduct,
    editProduct,
    
};