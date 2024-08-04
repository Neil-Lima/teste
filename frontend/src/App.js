import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState('');
  const [erro, setErro] = useState('');

  const API_URL = 'https://teste-8r54.onrender.com/api/usuarios';

  useEffect(() => {
    listarUsuarios();
  }, []);

  const listarUsuarios = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsuarios(response.data);
      setErro('');
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      setErro('Não foi possível carregar a lista de usuários. Tente novamente mais tarde.');
    }
  };

  const adicionarUsuario = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, { nome });
      setNome('');
      listarUsuarios();
      setErro('');
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      setErro('Não foi possível adicionar o usuário. Tente novamente mais tarde.');
    }
  };

  return (
    <div>
      <h1>Gerenciamento de Usuários</h1>
      {erro && <p style={{color: 'red'}}>{erro}</p>}
      <form onSubmit={adicionarUsuario}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          required
        />
        <button type="submit">Adicionar Usuário</button>
      </form>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario._id}>{usuario.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
