require('dotenv').config();
const express = require('../../frontend/node_modules/@types/express');
const cors = require('cors');
const connectDatabase = require('./config/database');
const usuarioRoutes = require('./routes/usuario.routes');

const app = express();

connectDatabase();

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Database: financas_db`);
});

module.exports = app;
