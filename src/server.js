require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/database');
const usuarioRoutes = require('./routes/usuario.routes');

const app = express();

connectDatabase();

// Configuração do CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://seu-frontend-no-netlify.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Database: financas_db`);
});

module.exports = app;
