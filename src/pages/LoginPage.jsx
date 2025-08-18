import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", pass: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <div className="row align-items-center">
              <div className="col-md-3">
                <img src="/img/logoCom4.png" alt="logo" />
              </div>
              <div className="col-md-9">
                <h2 className="text-center mb-4">Entrar</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">E-mail ou Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Senha</label>
                <input
                  type="password"
                  className="form-control"
                  value={form.pass}
                  onChange={(e) =>
                    setForm({ ...form, pass: e.target.value })
                  }
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Entrar
              </button>
            </form>

            <div className="mt-3 text-center">
              <a href="#">Esqueci minha senha</a> |{" "}
              <a href="#">Criar conta</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
