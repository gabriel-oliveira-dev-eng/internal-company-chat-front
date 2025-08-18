import React from 'react';

function Header() {
  return (
    <header className="app-header d-flex align-items-center px-3" style={{ background: 'linear-gradient(to right, #1E1C31, #322F4C)' }}>
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3">
            <div className="position-relative">
              <div className="col-md-3"></div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <img src="/img/logo_com4.png.jpeg" className="rounded-circle" style={{ width: '53px', height: 'auto' }} alt="Logo" />
              </div>
            </div>
          </div>
          <div className="flex-grow-1" style={{ maxWidth: '640px' }}>
            <div className="input-group">
              <span className="input-group-text bg-white"><i className="bi bi-search"></i></span>
              <input type="text" className="form-control" placeholder="Buscar..." />
            </div>
          </div>
          <button className="btn btn-outline-secondary d-flex align-items-center" aria-label="Configurações">
            <i className="bi bi-gear"></i>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;