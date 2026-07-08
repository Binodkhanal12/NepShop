require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');

    const colorMap = {
      "iPhone 15 Pro": "Obsidian",
      "Nike Air Max": "Crimson",
      "Dell XPS 13": "Ocean",
      "Cotton T-Shirt": "Forest",
      "Dell Latitude 3540": "Forest",
      "HP OMEN MAX 45L Gaming Desktop": "Crimson",
      "ASUS ROG Strix G16 (2025)": "Obsidian",
      "Clean Code": "Violet",
      "Introduction to Algorithms (CLRS)": "Ocean",
      "Logitech MX Master 3S Wireless Mouse": "Obsidian"
    };

    const products = await Product.find();

    for (const product of products) {
      if (colorMap[product.name]) {
        product.color = colorMap[product.name];
        await product.save();
        console.log(`${product.name} → ${product.color}`);
      }
    }

    console.log("✅ All product colors updated!");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
  });