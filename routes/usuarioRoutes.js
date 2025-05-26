const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');

router.post('/usuario', UsuarioController.criarUsuario);
router.get('/usuario', UsuarioController.listarUsuarios);
router.get('/usuario/:id', UsuarioController.listarPorId);
router.put('/usuario/:id', UsuarioController.editarUsuario);
router.delete('/usuario/:id', UsuarioController.excluirUsuario);

module.exports = router;
