// src/components/ChatBox.jsx
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
const user = "Gabriel Oliveira";

const socket = io("http://localhost:3000", {
  query: {user: user }
});

export default function ChatBox({user, targetUser}) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

useEffect(() => {
  if (!targetUser) return;

  // Limpa mensagens antigas imediatamente
  setMessages([]);

  const handleMessagesHistory = (msgs) => {
    setMessages(msgs);
  };

  const handleNewMessage = (msg) => {
    if (msg.from === targetUser || msg.to === targetUser) {
      setMessages((prev) => [...prev, msg]);
    }
  };

  // Configura os listeners
  socket.on("messagesHistory", handleMessagesHistory);
  socket.on("message", handleNewMessage);

  // Solicita o histórico
  socket.emit("getMessages", { user, targetUser });

  // Limpeza para evitar duplicação de listeners
  return () => {
    socket.off("messagesHistory", handleMessagesHistory);
    socket.off("message", handleNewMessage);
  };
}, [targetUser]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    socket.emit("message", {
      from: user,
      to: targetUser,
      text
    });
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
              msg.from === user ? "msg-out ms-auto" : "msg-in"
            }`}
          >
            <strong>{msg.from}:</strong> {msg.text}
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
