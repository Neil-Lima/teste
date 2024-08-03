import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [nome, setNome] = useState('');
  const [nomes, setNomes] = useState([]);

  const baseURL = 'https://teste-sand-five.vercel.app/api/usuarios';

  useEffect(() => {
    fetchNomes();
  }, []);

  const fetchNomes = async () => {
    try {
      const response = await axios.get(baseURL);
      setNomes(response.data);
    } catch (error) {
      console.error('Erro ao buscar nomes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(baseURL, { nome });
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
        {nomes.map((item) => (
          <li key={item._id}>{item.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
