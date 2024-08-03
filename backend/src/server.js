const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://victor:madara@cluster0.pbgayxb.mongodb.net/financas_db?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri);
const connection = mongoose.connection;

connection.once('open', () => {
  console.log("Conexão com MongoDB estabelecida com sucesso");
  console.log("Conectado ao banco de dados:", connection.db.databaseName);
});

const financeSchema = new mongoose.Schema({
  nome: String
}, { collection: 'financas_tb' });

const Finance = mongoose.model('Finance', financeSchema);

app.post('/financas', async (request, response) => {
  const novoItem = new Finance(request.body);
  try {
    await novoItem.save();
    response.status(201).json(novoItem);
  } catch (erro) {
    response.status(400).json({ mensagem: erro.message });
  }
});

app.get('/financas', async (request, response) => {
  try {
    const itens = await Finance.find({}, 'id nome');
    response.json(itens);
  } catch (erro) {
    response.status(500).json({ mensagem: erro.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
