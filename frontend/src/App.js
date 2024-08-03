import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [nome, setNome] = useState('');
  const [nomes, setNomes] = useState([]);

  useEffect(() => {
    fetchNomes();
  }, []);

  const fetchNomes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/usuarios');
      setNomes(response.data);
    } catch (error) {
      console.error('Error fetching names:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/usuarios', { nome });
      setNome('');
      fetchNomes();
    } catch (error) {
      console.error('Error adding name:', error);
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
        {nomes.map((item, index) => (
          <li key={index}>{item.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
