import React, { useState } from "react";
import { aiChat } from "../../Utils/AiModel";

function ChatWithGemini() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    setIsLoading(true);

    const newMessage = { role: "user", content: userInput };
    setChatHistory([...chatHistory, newMessage]);

    try {
      const result = await aiChat.sendMessage(userInput);

      const response = await result.response;
      const botResponse = { role: "bot", content: response.text() };
      setChatHistory((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error communicating with Gemini API:", error);
    } finally {
      setIsLoading(false);
      setUserInput("");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Chat with Google Gemini</h1>
      <div style={styles.chatBox}>
        {chatHistory.map((message, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: message.role === "user" ? "flex-end" : "flex-start",
              backgroundColor: message.role === "user" ? "#DCF8C6" : "#FFF",
            }}
          >
            <strong>{message.role === "user" ? "You:" : "Gemini:"}</strong>{" "}
            {message.content}
          </div>
        ))}
      </div>
      <textarea
        style={styles.textArea}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button style={styles.button} onClick={handleSend} disabled={isLoading}>
        {isLoading ? "Loading..." : "Send"}
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  chatBox: {
    width: "100%",
    maxWidth: "600px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    overflowY: "auto",
    maxHeight: "400px",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9",
  },
  message: {
    margin: "5px 0",
    padding: "10px",
    borderRadius: "8px",
    maxWidth: "75%",
  },
  textArea: {
    width: "100%",
    maxWidth: "600px",
    height: "50px",
    margin: "10px 0",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4285F4",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default ChatWithGemini;
