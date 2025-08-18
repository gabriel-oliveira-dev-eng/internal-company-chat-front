import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function HomePage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Olá.", type: "in" },
    { id: 2, text: "Boa tarde! Como posso ajudar?", type: "out" },
  ]);
  const [input, setInput] = useState("");

  const addMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), text: input, type: "out" }]);
    setInput("");
  };

  return (
    <div className="app-shell container-fluid">
      <div className="row h-100 g-0">
        {/* Sidebar */}
        <Sidebar />

        {/* Chat Area */}
        <main
          className="col chat-area d-flex flex-column"
          style={{
            backgroundImage: "url('/img/fundo.png')",
            backgroundSize: "cover",
          }}
        >
          <div className="chat-header d-flex align-items-center justify-content-between px-3 py-2 border-bottom bg-white sticky-top">
            <div className="d-flex align-items-center gap-2">
              <img
                src="https://avatar.iran.liara.run/public/girl"
                className="rounded-circle"
                width="40"
                height="40"
              />
              <span className="fw-semibold">Ana Souza</span>
            </div>
            <button className="btn btn-outline-secondary btn-sm">
              <i className="bi bi-three-dots-vertical"></i>
            </button>
          </div>

          {/* Histórico */}
          <div className="chat-scroll flex-grow-1 p-3 d-flex flex-column gap-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`msg shadow-sm ${
                  msg.type === "out" ? "msg-out ms-auto" : "msg-in"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Composer */}
          <div className="composer p-3">
            <form className="d-flex gap-2" onSubmit={addMessage}>
              <input
                type="text"
                className="form-control"
                placeholder="Digite uma mensagem..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                <i className="bi bi-send"></i>
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
