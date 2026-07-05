const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { manager } = require("../ai/chatbot");

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Process the message with NLP
    const result = await manager.process("en", message);

    // If confidence is low, we'll handle it ourselves later
    if (result.score < 0.6) {
      return res.json({
        reply: "I'm not sure I understood that. Could you rephrase your question?"
      });
    }

    // Greeting
    if (result.intent === "greeting") {
      return res.json({
        reply: result.answer
      });
    }

    // Show all products
    if (result.intent === "show.products") {
      const products = await Product.find();

      return res.json({
        reply: products.length
          ? products.map(p => `${p.name} - Rs.${p.price}`).join("\n")
          : "No products found."
      });
    }

    // Default NLP response
    return res.json({
      reply: result.answer || "I don't know how to answer that yet."
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      reply: "Server Error"
    });
  }
});

module.exports = router;