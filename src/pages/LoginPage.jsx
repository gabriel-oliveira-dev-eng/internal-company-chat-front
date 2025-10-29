import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useApi } from "../hooks/useApi";

export default function LoginPage() {
  const navigate = useNavigate();
  const { request, loading, error } = useApi();
  const [form, setForm] = useState({ email: "", password: "" });

  const fetchLogin = async (data) => {
  try {
    const login = await request("post", "/auth/login", data);
    return login;
  } catch(err){
    console.error("Erro ao buscar usuarios: ", err);
    return null;
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const login = await fetchLogin(form);

    if(login && login.access_token){
      localStorage.setItem("access_token",login.access_token);
      localStorage.setItem("user",JSON.stringify(login.payload));
      navigate("/home");
    } else{
      console.log("Resposta da API:", login); 
      console.log("Form:", form); 
    }
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
                <label className="form-label">E-mail</label>
                <input
                  type="email"
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
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
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
