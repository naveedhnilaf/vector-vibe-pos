require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/Product");
const Transaction = require("./models/Transaction");
const seedProducts = require("./products.json");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(seedProducts);
      console.log(`✅ Seeded ${seedProducts.length} products`);
    }
  })
  .catch((err) => console.error("❌ MongoDB error:", err));

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const { name, description, category, price, stock, imageUrl } = req.body;
    if (!name || price == null || stock == null) {
      return res.status(400).json({ error: "name, price, and stock are required" });
    }
    const product = new Product({
      id: "prod_" + Date.now(),
      name, description, category, price, stock, imageUrl,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to add product" });
  }
});

app.post("/api/transactions", async (req, res) => {
  try {
    const { items, subtotal, tax, discount, total } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }
    const transaction = new Transaction({ items, subtotal, tax, discount, total });
    await transaction.save();

    console.log("\n🧾 Transaction saved:");
    console.log("  Items   :", items.map((i) => `${i.name} x${i.qty}`).join(", "));
    console.log(`  Subtotal: $${subtotal.toFixed(2)}`);
    console.log(`  Tax     : $${tax.toFixed(2)}`);
    console.log(`  Discount: -$${discount.toFixed(2)}`);
    console.log(`  Total   : $${total.toFixed(2)}\n`);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save transaction" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Backend at http://localhost:${PORT}`);
  console.log(`   GET  /api/products`);
  console.log(`   POST /api/products`);
  console.log(`   POST /api/transactions\n`);
});