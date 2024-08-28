// Layer untuk handle RESQUEST dan RESPONSE
//Handles validasi body, 
//tipe data yang dimasukkan ke body harus sesuai
//nama tidak boleh sama

const express = require("express");
const router = express.Router();
const { getAllProducts, getProductById, createProduct, deleteProductById, updateProduct } = require("./product.services");

//Ambil semua data
router.get("/", async (req, res) => {
    const products = await getAllProducts();
    res.send(products);
});

//Cari data berdasarkan ID
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await getProductById(parseInt(id));
        res.send(product);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

//Tambah data
router.post("/", async (req, res) => {
    try {
        const productData = req.body;
        const products = await createProduct(productData)
        res.status(201).send("Data berhasil ditambahkan");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

//Hapus data
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await deleteProductById(parseInt(id));
        res.status(200).send("Data berhasil dihapus");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

//Ubah data - semua kolom harus terisi
router.patch("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const productData = req.body;

        //Buat sebuah kondisi ketika ada kolom yang tidak terisi
        if (!productData.name ||
            !productData.price ||
            !productData.description ||
            !productData.image) {
            res.status(400).send("Data tidak lengkap");
            return;
        }
        const products = await updateProduct(parseInt(id), productData);
        res.status(200).send("Data berhasil diubah");

    } catch (error) {
        res.status(400).send(error.message);
    }
});

//Ubah data - hanya kolom yang diisi
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const productData = req.body;

        const products = await updateProduct(parseInt(id), productData);
        res.status(200).send("Data berhasil diubah");

    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;