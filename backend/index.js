const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(express.json());
app.use(cors());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite"
});

const Product = require('./models/product')(sequelize, DataTypes);

sequelize.sync();

app.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Error fetching products");
  }
});

app.post("/products", async (req, res) => {
  try {
    const { name, price, stock, imageUrl } = req.body;
    const product = await Product.create({ name, price, stock, imageUrl });
    io.emit("productsUpdated", await Product.findAll());
    res.json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Error creating product");
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.update(req.body);
      io.emit("productsUpdated", await Product.findAll());
      res.json(product);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Error updating product");
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      io.emit("productsUpdated", await Product.findAll());
      res.sendStatus(204);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Error deleting product");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


