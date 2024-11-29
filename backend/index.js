const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite"
});

const User = require('./models/user')(sequelize, DataTypes);
const Product = require('./models/product')(sequelize, DataTypes);
const Purchase = require('./models/purchase')(sequelize, DataTypes);

Purchase.associate({ User, Product });

sequelize.sync();

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (token) {
    jwt.verify(token, "tu_secreto", (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword, role });
  res.json(user);
});


app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username: user.username, role: user.role }, "tu_secreto", { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).send("Usuario o contraseña incorrectos");
  }
});

app.get("/products", authenticateJWT, async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

app.post("/products", authenticateJWT, async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);
  const { name, price, stock, imageUrl } = req.body;
  const product = await Product.create({ name, price, stock, imageUrl });
  res.json(product);
});

app.put("/products/:id", authenticateJWT, async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);
  const product = await Product.findByPk(req.params.id);
  if (product) {
    await product.update(req.body);
    res.json(product);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

app.delete("/products/:id", authenticateJWT, async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);
  const product = await Product.findByPk(req.params.id);
  if (product) {
    await product.destroy();
    res.sendStatus(204);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

app.get("/purchases", authenticateJWT, async (req, res) => {
  const purchases = await Purchase.findAll({ where: { userId: req.user.id }, include: [Product] });
  res.json(purchases);
});

app.post("/purchases", authenticateJWT, async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findByPk(productId);

  if (product && product.stock >= quantity) {
    product.stock -= quantity;
    await product.save();

    const purchase = await Purchase.create({ productId, quantity, userId: req.user.id });
    res.json(purchase);
  } else {
    res.status(400).send("Producto no disponible o cantidad insuficiente");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
