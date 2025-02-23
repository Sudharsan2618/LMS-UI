import { useState } from "react";

const API_URL = "https://chatbot-backend-wvi9.onrender.com/query";

export function useCustomChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "Thinking..." }
    ]);

    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: input,
          file_key: "none"
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", content: data.result },
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", content: "Sorry, something went wrong. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, input, handleInputChange, handleSubmit, isLoading };
}
