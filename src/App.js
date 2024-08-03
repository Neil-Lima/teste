import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [nome, setNome] = useState('');
  const [financas, setFinancas] = useState([]);

  useEffect(() => {
    buscarFinancas();
  }, []);

  const buscarFinancas = async () => {
    try {
      const resposta = await fetch('http://localhost:5000/financas');
      const dados = await resposta.json();
      setFinancas(dados);
    } catch (erro) {
      console.error('Erro ao buscar financas:', erro);
    }
  };

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    try {
      await fetch('http://localhost:5000/financas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome }),
      });
      setNome('');
      buscarFinancas();
    } catch (erro) {
      console.error('Erro ao enviar financa:', erro);
    }
  };

  return (
    <>
      <h1>Gerenciador de Finanças</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do item financeiro"
        />
        <button type="submit">Adicionar Item</button>
      </form>
      <h2>Lista de Itens Financeiros:</h2>
      <ul>
        {financas.map((item) => (
          <li key={item._id}>{item.nome}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
