//VALIDASI AWAL SAJA

const express = require("express");
const app = express();
app.use(express.json());

//Menyimpan ENV
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

const cors = require("cors");
app.use(cors());

//? Routing
app.get("/api", (req, res) => {
    res.send("Selamat datang di API akuh");
});

const productController = require("./product/product.controller");
app.use("/products", productController);

app.listen(PORT, () => {
    console.log(`Server is running di port ` + PORT);
});
