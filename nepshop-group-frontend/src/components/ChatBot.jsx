import { useState } from "react";
import "./ChatBot.css";

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Namaste! Welcome to NepShop. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");

  // Send message to backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const question = input;
    setInput("");

    try {
      const response = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: question,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I couldn't connect to NepShop AI.",
        },
      ]);
    }
  };

  return (
    <div className="chatbot">
      <div className="chat-header">
        <h3>NepShop AI</h3>
      </div>

      <div className="chat-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === "bot" ? "bot-message" : "user-message"}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-footer">
        <input
          type="text"
          placeholder="Ask NepShop AI..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatBot;