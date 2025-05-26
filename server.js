const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const path = require('path');


const usuarioRoutes = require('./routes/usuarioRoutes');
const eventoRoutes = require('./routes/eventoRoutes');
const inscricaoRoutes = require('./routes/inscricaoRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares globais
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('view')); 


// Rotas
app.use('/api', usuarioRoutes);
app.use('/api', eventoRoutes);
app.use('/api', inscricaoRoutes);

// Rota base (opcional)
app.get('/', (req, res) => {
  res.send('API de Gerenciamento de Eventos 🚀');
});

app.listen(port, () => {
  console.log(`✅ Servidor rodando na porta ${port}`);
});
