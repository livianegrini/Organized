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
// app.use(express.static('view')); 

app.set('views', path.join(__dirname, 'view/pages'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// Rotas
app.use('/api', usuarioRoutes);
app.use('/api', eventoRoutes);
app.use('/api', inscricaoRoutes);
app.use('/assets', express.static(path.join(__dirname, 'assets')));
// Rota base (opcional)
app.get('/', (req, res) => {
 res.render('home');
});

app.get('/cadastro', (req, res) => {
  res.render('cadastro'); 
});


app.listen(port, () => {
  console.log(`✅ Servidor rodando na porta ${port}`);
});
