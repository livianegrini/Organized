const express = require('express');
const router = express.Router();
const InscricaoController = require('../controllers/inscricaoController');

router.post('/inscricao', InscricaoController.criarInscricao);
router.get('/inscricao', InscricaoController.listarInscricoes);
router.get('/inscricao/:id', InscricaoController.listarPorId);
router.put('/inscricao/:id', InscricaoController.editarInscricao);
router.delete('/inscricao/:id', InscricaoController.excluirInscricao);

module.exports = router;
