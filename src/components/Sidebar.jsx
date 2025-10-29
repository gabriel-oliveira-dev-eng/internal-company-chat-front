import React, { useState, useEffect } from "react";
import { useApi } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const userLogged = JSON.parse(localStorage.getItem("user"));
const socket = io("http://localhost:3000", {
  query: { user: userLogged?.username },
});

function Sidebar({ onSelectUser }) {
  const { request, loading, error } = useApi();
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const userData = await request("get", "/user");
      const groupData = await request("get", "/groups");
      setUsers(userData);
      setGroups(groupData);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    socket.emit("getOnlineUsers");

    socket.on("onlineUsers", (usersOnline) => {
      setOnlineUsers(usersOnline);
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <aside className="col-12 col-md-4 col-lg-3 sidebar d-flex flex-column p-3 h-100">
      <div className="flex-grow-1 overflow-y-auto">
        <div className="users" style={{ height: "auto" }}>
          <div className="section-title">Usuários</div>
          <div className="sidebar-list mb-3">
            <ul className="list-unstyled m-0">
              {users.map((user, index) => {
                const isOnline = onlineUsers.includes(user.username);
                return (
                  <li
                    key={index}
                    className="d-flex align-items-center gap-2 p-2 rounded hover-bg"
                    style={{ cursor: "pointer" }}
                    onClick={() => onSelectUser(user.username)}
                  >
                    <div className="position-relative">
                      <img
                        src={`https://avatar.iran.liara.run/username?username=${encodeURIComponent(
                          user.username.replace(".", ",")
                        )}`}
                        className="rounded-circle"
                        alt=""
                        width="36"
                        height="36"
                      />
                      {isOnline && (
                        <span
                          className="position-absolute bottom-0 end-0 translate-middle p-1 bg-success border border-light rounded-circle"
                          style={{
                            width: "10px",
                            height: "10px",
                            right: "0",
                            bottom: "0",
                          }}
                        ></span>
                      )}
                    </div>
                    <span className="text-truncate">
                      {user.full_name}
                      <small
                        className={`ms-2 ${
                          isOnline ? "text-success" : "text-secondary"
                        }`}
                      >
                        ({isOnline ? "online" : "offline"})
                      </small>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <hr />
        <div className="groups" style={{ height: "auto" }}>
          <div className="section-title">Grupos</div>
          <div className="sidebar-list">
            <ul className="list-unstyled m-0">
              {groups.map((group, index) => (
                <li
                  key={index}
                  className="d-flex align-items-center gap-2 p-2 rounded"
                >
                  <div
                    className="rounded-circle d-inline-flex justify-content-center align-items-center bg-light border"
                    style={{ width: "36px", height: "36px" }}
                  >
                    <i className="bi bi-people"></i>
                  </div>
                  <span className="text-truncate">{group.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr />
      </div>

      <div className="personal mt-auto">
        <div className="section-title">Meus dados</div>
        <div className="sidebar-data">
          <div className="d-flex align-items-center gap-3">
            <div className="position-relative">
              <img
                src="https://avatar.iran.liara.run/username?username=Gabriel+Oliveira"
                alt="Avatar"
                className="rounded-circle"
                width="40"
                height="40"
              />
              <span className="status-dot bg-success"></span>
            </div>
            <div
              className="fw-semibold"
              style={{ marginRight: "60px" }}
            >
              {userLogged?.full_name}
            </div>
            <button
              className="btn btn-outline-secondary d-flex align-items-center"
              aria-label="Configurações"
              onClick={() => navigate("/profile")}
            >
              <i className="bi bi-gear"></i>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;