import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [nome, setNome] = useState('');
  const [nomes, setNomes] = useState([]);

  const baseURL = 'https://teste-sand-five.vercel.app';

  useEffect(() => {
    fetchNomes();
  }, []);

  const fetchNomes = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/usuarios`);
      if (Array.isArray(response.data)) {
        setNomes(response.data);
      } else {
        console.error('Resposta da API não é um array:', response.data);
        setNomes([]);
      }
    } catch (error) {
      console.error('Erro ao buscar nomes:', error);
      setNomes([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/api/usuarios`, { nome });
      setNome('');
      fetchNomes();
    } catch (error) {
      console.error('Erro ao adicionar nome:', error);
    }
  };

  return (
    <div className="App">
      <h1>Nome</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          placeholder="Digite um nome"
        />
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {Array.isArray(nomes) && nomes.map((item) => (
          <li key={item._id}>{item.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
