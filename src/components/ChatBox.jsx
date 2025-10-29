import { useState, useEffect, useRef } from "react"; // Importar useRef
import { io } from "socket.io-client";

const userLogged = JSON.parse(localStorage.getItem("user"));
const socket = io("http://localhost:3000", {
  query: { user: userLogged?.full_name },
});

export default function ChatBox({user, targetUser}) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null); // Ref para o final das mensagens

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth",block: "end" });
  };

useEffect(() => {
  if (!targetUser) return;

  setMessages([]);

  const handleMessagesHistory = (msgs) => {
    setMessages(msgs);
  };

  const handleNewMessage = (msg) => {
    if (msg.from === targetUser || msg.to === targetUser || msg.from === user) { // Adicionado msg.from === user para ver minhas próprias mensagens
      setMessages((prev) => [...prev, msg]);
    }
  };

  socket.on("messagesHistory", handleMessagesHistory);
  socket.on("message", handleNewMessage);

  socket.emit("getMessages", { user, targetUser });

  return () => {
    socket.off("messagesHistory", handleMessagesHistory);
    socket.off("message", handleNewMessage);
  };
}, [targetUser, user]);

useEffect(() => {
  scrollToBottom();
}, [messages]);


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
    <div className="flex-grow-1 d-flex flex-column h-100">
      <div
        className="chat-scroll flex-grow-1 p-3 d-flex flex-column gap-2 overflow-y-auto" // Adicionado overflow-y-auto
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
              msg.from === user ? "msg-out ms-auto bg-primary text-white" : "msg-in bg-light" // Adicionado cores
            } p-2 rounded`} // Adicionado padding e arredondamento
            style={{maxWidth: "75%", wordBreak: "break-word"}} // Limitar largura da mensagem
          >
            <strong className="d-block mb-1">{msg.from}:</strong> {msg.text} {/* Mensagem de texto abaixo do nome */}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Elemento para rolar para o final */}
      </div>

      {/* Campo de envio */}
      <div className="composer p-3 border-top bg-white flex-shrink-0"> {/* Adicionado border-top e bg-white */}
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
