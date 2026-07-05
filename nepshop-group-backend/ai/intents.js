const { NlpManager } = require("node-nlp");

const manager = new NlpManager({ languages: ["en"] });

// Greetings
manager.addDocument("en", "hello", "greeting");
manager.addDocument("en", "hi", "greeting");
manager.addDocument("en", "hey", "greeting");
manager.addDocument("en", "good morning", "greeting");

// Product Search
manager.addDocument("en", "show products", "show.products");
manager.addDocument("en", "show electronics", "show.category");
manager.addDocument("en", "show books", "show.category");
manager.addDocument("en", "show accessories", "show.category");
manager.addDocument("en", "show clothing", "show.category");

// Recommendation
manager.addDocument("en", "recommend laptop", "recommend");
manager.addDocument("en", "suggest laptop", "recommend");
manager.addDocument("en", "best laptop", "recommend");
manager.addDocument("en", "gaming laptop", "recommend");

// Comparison
manager.addDocument("en", "compare products", "compare");
manager.addDocument("en", "compare dell and asus", "compare");

// Price
manager.addDocument("en", "cheapest product", "cheapest");
manager.addDocument("en", "most expensive product", "expensive");

// Goodbye
manager.addDocument("en", "bye", "bye");
manager.addDocument("en", "thank you", "thanks");

// Responses
manager.addAnswer("en", "greeting", "Hello 👋 Welcome to NepShop! How can I help you today?");
manager.addAnswer("en", "thanks", "You're welcome 😊");
manager.addAnswer("en", "bye", "Goodbye! Have a wonderful day.");

module.exports = manager;