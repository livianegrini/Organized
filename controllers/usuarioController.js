const usuarioService = require('../services/usuarioService');

async function criarUsuario(req, res) {
  try {
    const usuario = await usuarioService.criarUsuario(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function listarUsuarios(req, res) {
  try {
    const usuarios = await usuarioService.listarUsuarios();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function listarPorId(req, res) {
  try {
    const usuario = await usuarioService.buscarUsuarioPorId(req.params.id);
    res.status(200).json(usuario);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function editarUsuario(req, res) {
  try {
    const usuario = await usuarioService.atualizarUsuario(req.params.id, req.body);
    res.status(200).json(usuario);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function excluirUsuario(req, res) {
  try {
    await usuarioService.excluirUsuario(req.params.id);
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const resultado = await usuarioService.login(email, senha);
    res.status(200).json(resultado);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}


module.exports = {
  criarUsuario,
  listarUsuarios,
  listarPorId,
  editarUsuario,
  excluirUsuario,
  login
};
