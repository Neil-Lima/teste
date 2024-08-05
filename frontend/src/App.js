import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://backend-teste-seven.vercel.app';

function App() {
  const [nome, setNome] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/usuarios`);
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/usuarios`, { nome });
      setNome('');
      fetchUsuarios();
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
    }
  };

  return (
    <div>
      <h1>Adicionar Nome</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite um nome"
        />
        <button type="submit">Adicionar</button>
      </form>

      <h2>Lista de Nomesj</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario._id}>{usuario.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
