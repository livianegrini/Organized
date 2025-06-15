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

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages')); // Define o diretório das views para a pasta 'pages'
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve arquivos estáticos da pasta 'public'

app.use('/api', usuarioRoutes);
app.use('/api', eventoRoutes);
app.use('/api', inscricaoRoutes);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.render('login');
});

app.get('/home', (req, res) => {
  res.render('home');
});


app.get('/cadastro', (req, res) => {
  res.render('cadastro');
});

app.get('/editarEvento/:id', (req, res) => {
  const eventoId = req.params.id; // Pega o ID do evento diretamente da URL
  if (!eventoId) {
    return res.status(400).send('ID do evento é obrigatório para editar.');
  }
  res.render('editarEvento', { eventoId: eventoId });
  console.log('Acessando página de edição para o Evento ID:', eventoId);
});


app.put('/editarEvento/:id', (req, res) => {
  const eventoId = req.params.id; // Pega o ID da URL
  console.log('Recebida requisição PUT para atualizar Evento ID:', eventoId);
  console.log('Dados recebidos:', req.body);
  res.status(200).send(`Evento ${eventoId} atualizado com sucesso!`);
});

app.get('/homeUsuario', (req, res) => {
  res.render('homeUsuario');
});

app.get('/cadastroUsuario', (req, res) => {
  res.render('cadastroUsuario');
});

app.get('/homeInscricao', (req, res) => {
  res.render('homeInscricao');
});

app.get('/cadastroInscricao', (req, res) => {
  res.render('cadastroInscricao');
});


app.get('/editarInscricao/:id', (req, res) => {
  const inscricaoId = req.params.id;
  if (!inscricaoId) {
    return res.status(400).send('ID da inscrição é obrigatório para editar.');
  }
  res.render('editarInscricao', { inscricaoId });
  console.log('Acessando página de edição para a Inscrição ID:', inscricaoId);
});

app.listen(port, () => {
  console.log(`✅ Servidor rodando na porta ${port}`);
});