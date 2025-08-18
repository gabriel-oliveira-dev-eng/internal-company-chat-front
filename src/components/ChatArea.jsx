import React, { useState, useEffect, useRef } from 'react';

function ChatArea() {
  const [messages, setMessages] = useState([
    { text: 'Olá.', type: 'in' },
    { text: 'Boa tarde! Como posso ajudar?', type: 'out' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatScrollRef = useRef(null);

  // Efeito para rolar para a última mensagem
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (text) {
      setMessages([...messages, { text, type: 'out' }]);
      setInputValue('');
    }
  };

  return (
    <main className="col chat-area d-flex flex-column" style={{ backgroundImage: "url('./img/fundo.png')", backgroundSize: 'cover' }}>
      <div className="chat-header d-flex align-items-center justify-content-between px-3 py-2 border-bottom bg-white sticky-top" style={{ zIndex: 10 }}>
        <div className="d-flex align-items-center gap-2">
          <img src="https://avatar.iran.liara.run/public/girl" className="rounded-circle" alt="" width="40" height="40" />
          <span className="fw-semibold">Ana Souza</span>
        </div>
        <button className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-three-dots-vertical"></i>
        </button>
      </div>

      <div className="chat-scroll flex-grow-1 p-3 d-flex flex-column gap-2" ref={chatScrollRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`msg ${msg.type === 'in' ? 'msg-in' : 'msg-out ms-auto'} shadow-sm`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="composer p-3">
        <form className="d-flex gap-2" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="form-control"
            placeholder="Digite uma mensagem..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="btn btn-primary" type="submit" aria-label="Enviar">
            <i className="bi bi-send"></i>
          </button>
        </form>
      </div>
    </main>
  );
}

export default ChatArea;