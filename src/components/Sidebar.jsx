import React, { useState, useEffect } from 'react';
import { useApi } from "../hooks/useApi";


function Sidebar({onSelectUser}) {
  const { request, loading, error } = useApi();
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  

  const fetchUsers = async () => {
    try {
      const userData = await request("get", "/user");
      const groupData = await request("get", "/groups");
      setUsers(userData);
      setGroups(groupData);
    } catch(err){
      console.error("Erro ao buscar usuarios: ", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if(loading){
    return (<p>Carregando...</p>);
  }

  if(error){
    return (<p>Erro: {error}</p>);
  }


  return (
    <aside className="col-12 col-md-4 col-lg-3 sidebar d-flex flex-column p-3">
      <div className="section-title">Usuários</div>
      <div className="sidebar-list mb-3">
        <ul className="list-unstyled m-0">
          {users.map((user, index) => (
            <li key={index} className="d-flex align-items-center gap-2 p-2 rounded hover-bg" style={{cursor: "pointer"}} onClick={() => onSelectUser(user.username)}>
              <img src={`https://avatar.iran.liara.run/username?username=${encodeURIComponent(user.username.replace('.', ','))}`} className="rounded-circle" alt="" width="36" height="36" />
              <span className="text-truncate">{user.username}</span>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div className="section-title">Grupos</div>
      <div className="sidebar-list">
        <ul className="list-unstyled m-0">
          {groups.map((group, index) => (
            <li key={index} className="d-flex align-items-center gap-2 p-2 rounded">
              <div className="rounded-circle d-inline-flex justify-content-center align-items-center bg-light border" style={{ width: '36px', height: '36px' }}>
                <i className="bi bi-people"></i>
              </div>
              <span className="text-truncate">{group.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div className="personal">
        <div className="section-title">Meus dados</div>
        <div className="sidebar-data">
          <div className="d-flex align-items-center gap-3">
            <div className="position-relative">
              <img src="https://avatar.iran.liara.run/public/27" alt="Avatar" className="rounded-circle" width="40" height="40" />
              <span className="status-dot"></span>
            </div>
            <div className="fw-semibold" style={{ marginRight: '60px' }}>Gabriel Oliveira</div>
            <button className="btn btn-outline-secondary d-flex align-items-center" aria-label="Configurações" onClick={() => navigate("/profile")}>
              <i className="bi bi-gear"></i>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;