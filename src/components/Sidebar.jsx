import React from 'react';

// Dados de exemplo para usuários e grupos
const users = [
  { name: 'Ana Souza', avatar: 'https://avatar.iran.liara.run/public/girl' },
  { name: 'Carlos Lima', avatar: 'https://avatar.iran.liara.run/public/29' },
  { name: 'Marina Dias', avatar: 'https://avatar.iran.liara.run/public/girl' },
  { name: 'Rafael Alves', avatar: 'https://avatar.iran.liara.run/public/29' },
  { name: 'Juliana Prado', avatar: 'https://avatar.iran.liara.run/public/girl' },
];

const groups = [
  { name: 'Equipe Produto' },
  { name: 'Suporte' },
  { name: 'Família' },
];

function Sidebar() {
  return (
    <aside className="col-12 col-md-4 col-lg-3 sidebar d-flex flex-column p-3">
      <div className="section-title">Usuários</div>
      <div className="sidebar-list mb-3">
        <ul className="list-unstyled m-0">
          {users.map((user, index) => (
            <li key={index} className="d-flex align-items-center gap-2 p-2 rounded hover-bg">
              <img src={user.avatar} className="rounded-circle" alt="" width="36" height="36" />
              <span className="text-truncate">{user.name}</span>
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
            <button className="btn btn-outline-secondary d-flex align-items-center" aria-label="Configurações">
              <i className="bi bi-gear"></i>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;