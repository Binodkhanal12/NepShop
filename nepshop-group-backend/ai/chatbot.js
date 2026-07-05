const manager = require("./intents");

async function trainAI() {
  await manager.train();
  manager.save();
  console.log("✅ NepShop AI Trained");
}

module.exports = {
  manager,
  trainAI,
};