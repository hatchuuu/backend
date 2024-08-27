// Layer untuk handle RESQUEST dan RESPONSE
//Handles validasi body, 
//tipe data yang dimasukkan ke body harus sesuai
//nama tidak boleh sama

const express = require("express");
const router = express.Router();

//Ambil semua data
router.get("/products", async (req, res) => {
    const products = await prisma.product.findMany();
    res.json(products);
});

//Cari data berdasarkan ID
router.get("/products/:id", async (req, res) => {
    const productId = req.params.id;
    const product = await prisma.product.findUnique({ //findUnique untuk mencari data yang unik
        where:{
            id: parseInt(productId),
        },
    });

    if (!product) {
        res.status(400).send("Data tidak ditemukan");
        return;
    }
    res.send(product);  
});

//Tambah data
router.post("/products", async (req, res) => {
    const parameter = req.body;
    const products = await prisma.product.create({
        data: {
            name: parameter.name,
            price: parameter.price,
            description: parameter.description,
            image: parameter.image,
        },
    }); //create data
    res.status(201).send("Data berhasil ditambahkan");
});

//Hapus data
router.delete("/products/:id", async (req, res) => {
    const id = req.params.id;
    const products = await prisma.product.delete({
        where: {
            id: parseInt(id), //ubah jadi integer
        },
    }); //hapus data
    res.status(200).send("Data berhasil dihapus");
});

//Ubah data - semua kolom harus terisi
router.put("/products/:id", async (req, res) => {
    const id = req.params.id;
    const parameter = req.body;

    //Buat sebuah kondisi ketika ada kolom yang tidak terisi
    if (!parameter.name || !parameter.price || !parameter.description || !parameter.image) {
        res.status(400).send("Data tidak lengkap");
        return;
    }

    const products = await prisma.product.update({
        where: {
            id: parseInt(id),
        },
        data: {
            name: parameter.name,
            price: parameter.price,
            description: parameter.description,
            image: parameter.image,
        },
    }); //update data
    res.send({
        message: "Data berhasil diubah",
        data: products,
    })
});

//Ubah data - hanya kolom yang diisi
router.patch("/products/:id", async (req, res) => {
    const id = req.params.id;
    const parameter = req.body;

    const products = await prisma.product.update({
        where: {
            id: parseInt(id),
        },
        data: {
            name: parameter.name,
            price: parameter.price,
            description: parameter.description,
            image: parameter.image,
        },
    }); //update data
    res.send({
        message: "Data berhasil diubah",
        data: products,
    })
});

module.exports = router;