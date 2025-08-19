import React, { useState, useEffect } from 'react';
import { useApi } from "../hooks/useApi";

const FormularioUsuario = () => {
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    username: '',
    senha: '',
  });
  
  const { request, loading, error } = useApi();


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Obtenha o token do localStorage
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('Token de acesso não encontrado.');
        }

        // Faça a requisição para a sua rota de dados do usuário
        // Assumindo que você tem uma rota como GET /users/me
        await request
        const response = await request("GET","/user/me");


        setFormData({
          id: response.id || '',
          email: response.email || '',
          username: response.username || '',
          senha: '',
        });
        setLoading(false);

      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        await request("PATCH",`/user/${response.id}`,formData);
    } catch(err){
        console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h2 className="mb-4 text-center">Editar</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">UserName</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="senha" className="form-label">Nova senha</label>
            <input
              type="password"
              className="form-control"
              id="senha"
              name="senha"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioUsuario;