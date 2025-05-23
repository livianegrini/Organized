// routes/index.js
const express = require('express');
const router = express.Router();
const EventoController = require('../controllers/EventoController');

// Rotas para o CRUD de eventos
router.post('/evento', EventoController.criarEvento);
router.get('/evento', EventoController.listarEventos);
router.get('/evento/:id', EventoController.listarPorId);
router.put('/evento/:id', EventoController.editarEvento);
router.delete('/evento/:id', EventoController.excluirEvento);

module.exports = router;