// src/components/ChatBox.jsx
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState("Gabriel");

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.emit("getMessages");
    socket.on("messagesHistory", (msgs) => {
      setMessages(msgs);
    });

    return () => {
      socket.off("message");
      socket.off("messagesHistory");
    };
  }, []); // ← dependências vazias (executa apenas 1x)

  const sendMessage = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    socket.emit("message", { user, text });
    setText("");
  };

  return (
    <div className="flex-grow-1 d-flex flex-column">
      {/* Histórico */}
      <div
        className="chat-scroll flex-grow-1 p-3 d-flex flex-column gap-2"
        style={{
          backgroundImage: "url('/img/fundo.png')",
          backgroundSize: "cover",
          overflowY: "auto",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`msg shadow-sm ${
              msg.user === user ? "msg-out ms-auto" : "msg-in"
            }`}
          >
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>

      {/* Campo de envio */}
      <div className="composer p-3">
        <form className="d-flex gap-2" onSubmit={sendMessage}>
          <input
            type="text"
            className="form-control"
            placeholder="Digite uma mensagem..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            <i className="bi bi-send"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
