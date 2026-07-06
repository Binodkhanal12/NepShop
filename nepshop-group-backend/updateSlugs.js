require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    const products = await Product.find();

    for (const product of products) {
      const slug = product.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      product.slug = slug;

      await product.save();

      console.log(`${product.name} → ${slug}`);
    }

    console.log("✅ All product slugs updated");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });