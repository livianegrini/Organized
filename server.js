// const express = require('express');
// const db = require('./config/db');
// require('dotenv').config();

// const app = express();

// app.get('/', async (req, res) => {
//   try {
//     const result = await db.query('SELECT NOW()');
//     res.send(`Hora atual no banco: ${result.rows[0].now}`);
//   } catch (err) {
//     res.status(500).send(`Erro ao conectar com o banco.\n${err}`);
//   }
// });

// const PORT = process.env.PORT || 5432;
// app.listen(PORT, () => {
//   console.log(`Servidor rodando em http://localhost:${PORT}`);
// });

// Versão Atual
// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/usuarioRoutes');

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Usando as rotas definidas
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// const PORT = process.env.PORT || 5432;
// app.listen(PORT, () => {
//   console.log(`Servidor rodando em http://localhost:${PORT}`);
// });
