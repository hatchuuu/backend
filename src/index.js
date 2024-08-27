//VALIDASI AWAL SAJA

const express = require("express");
const app = express();
app.use(express.json());

//Menyimpan ENV
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

//? ORM Prisma untuk mmbantu database
const { PrismaClient } = require("@prisma/client"); //karena sebuah class
const prisma = new PrismaClient();

//? Routing
app.get("/api", (req, res) => {
    res.send("Selamat datang di API akuh");
});

//Cari data berdasarkan ID
app.get("/products/:id", async (req, res) => {
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

//Ambil semua data
app.get("/products", async (req, res) => {
    const products = await prisma.product.findMany();
    res.json(products);
});

//Tambah data
app.post("/products", async (req, res) => {
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
app.delete("/products/:id", async (req, res) => {
    const id = req.params.id;
    const products = await prisma.product.delete({
        where: {
            id: parseInt(id), //ubah jadi integer
        },
    }); //hapus data
    res.status(200).send("Data berhasil dihapus");
});

//Ubah data - semua kolom harus terisi
app.put("/products/:id", async (req, res) => {
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
app.patch("/products/:id", async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Server is running di port ` + PORT);
});
