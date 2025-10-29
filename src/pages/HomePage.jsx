// src/pages/HomePage.jsx
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import React, { useState, useEffect, useRef } from 'react';

export default function HomePage() {
  const user = JSON.parse(localStorage.getItem("user")).username;
  const [targetUser, setTargetUser] = useState("Hellen Modesto");
  return (
    <div className="app-shell container-fluid d-flex flex-column h-100">
      <div className="row h-100 g-0 flex-grow-1">
        <Sidebar onSelectUser={setTargetUser} />

        <main className="col chat-area d-flex flex-column bg-white h-100">
          <div className="chat-header d-flex align-items-center justify-content-between px-3 py-2 border-bottom sticky-top bg-white">
            <div className="d-flex align-items-center gap-2">
              <img
                src={`https://avatar.iran.liara.run/username?username=${encodeURIComponent(targetUser.replace('.', ','))}`}
                className="rounded-circle"
                width="40"
                height="40"
              />
              <span className="fw-semibold">{targetUser}</span>
            </div>
          </div>
          <ChatBox user={user} targetUser={targetUser}/>
        </main>
      </div>
    </div>
  );
}
