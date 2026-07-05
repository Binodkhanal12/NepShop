const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const aiRoutes = require('./routes/ai');
const { trainAI } = require('./ai/chatbot');

console.log("JWT_SECRET =", process.env.JWT_SECRET);

const app = express();

app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());

app.use("/api/ai", aiRoutes);
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));

app.get('/', (req, res) => {
  res.json({ message: '🚀 Ecommerce Backend Running!' });
});

console.log("MONGO_URI =", process.env.MONGO_URI);

let trained = false;

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    console.log("✅ MongoDB Connected");

    if (!trained) {
        await trainAI();
        trained = true;
        console.log("✅ NepShop AI Trained");
    }

    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on ${process.env.PORT || 5000}`);
    });
})
.catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
});