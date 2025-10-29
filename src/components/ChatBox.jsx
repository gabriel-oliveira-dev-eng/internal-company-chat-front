import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function ChatBox({ user, targetUser }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null); // 🔹 armazenar a conexão do socket

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    socketRef.current = io("http://localhost:3000", {
      query: { user },
    });

    const socket = socketRef.current;

    if (!targetUser) return;

    setMessages([]);

    const handleMessagesHistory = (msgs) => {
      setMessages(msgs);
    };

    const handleNewMessage = (msg) => {
      if (msg.from === targetUser || msg.to === targetUser || msg.from === user) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("messagesHistory", handleMessagesHistory);
    socket.on("message", handleNewMessage);

    socket.emit("getMessages", { user, targetUser });

    return () => {
      socket.off("messagesHistory", handleMessagesHistory);
      socket.off("message", handleNewMessage);
      socket.disconnect();
    };
  }, [targetUser, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    // 🔹 Usa o socket armazenado em ref
    socketRef.current.emit("message", {
      from: user,
      to: targetUser,
      text,
    });

    setText("");
  };

  return (
    <div className="flex-grow-1 d-flex flex-column h-100">
      <div
        className="chat-scroll flex-grow-1 p-3 d-flex flex-column gap-2 overflow-y-auto"
        style={{
          backgroundImage: "url('/img/fundo.png')",
          backgroundSize: "cover",
          maxHeight: "700px",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`msg shadow-sm ${
              msg.from === user ? "msg-out ms-auto bg-primary text-white" : "msg-in bg-light"
            } p-2 rounded`}
            style={{ maxWidth: "75%", wordBreak: "break-word" }}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="composer p-3 border-top bg-white flex-shrink-0">
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
