// Layer untuk handle RESQUEST dan RESPONSE
//Handles validasi body, 
//tipe data yang dimasukkan ke body harus sesuai
//nama tidak boleh sama

const express = require("express");
const router = express.Router();
const prisma = require("../lib");
const { getAllProducts, getProductById } = require("./product.services");

//Ambil semua data
router.get("/", async (req, res) => {
    const products = await getAllProducts();
    res.send(products);
});

//Cari data berdasarkan ID
router.get("/:id", async (req, res) => {
    try {
        const producId = req.params.id;
        const product = await getProductById(parseInt(producId));
        res.send(product);  
    } catch (error) {
        res.status(400).send(error.message)
    }
});

//Tambah data
router.post("/", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const products = await prisma.product.delete({
        where: {
            id: parseInt(id), //ubah jadi integer
        },
    }); //hapus data
    res.status(200).send("Data berhasil dihapus");
});

//Ubah data - semua kolom harus terisi
router.put("/:id", async (req, res) => {
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
router.patch("/:id", async (req, res) => {
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