// src/pages/HomePage.jsx
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";

export default function HomePage() {
  return (
    <div className="app-shell container-fluid">
      <div className="row h-100 g-0">
        <Sidebar />

        <main className="col chat-area d-flex flex-column bg-white">
          <div className="chat-header d-flex align-items-center justify-content-between px-3 py-2 border-bottom sticky-top bg-white">
            <div className="d-flex align-items-center gap-2">
              <img
                src="https://avatar.iran.liara.run/public/girl"
                className="rounded-circle"
                width="40"
                height="40"
              />
              <span className="fw-semibold">Chat em tempo real</span>
            </div>
          </div>
          <ChatBox />
        </main>
      </div>
    </div>
  );
}
