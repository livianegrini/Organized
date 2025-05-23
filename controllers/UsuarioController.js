// controllers/UsuarioController.js
const pool = require('../config/db');

// Criar um novo usuário
exports.criarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  const query = 'INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3) RETURNING *';
  const values = [nome, email, senha];

  try {
    const result = await pool.query(query, values);
    const usuario = result.rows[0];
    res.status(201).json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todos os usuários
exports.listarUsuarios = async (req, res) => {
  const query = 'SELECT * FROM usuario';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar um usuário
exports.listarPorId = async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM usuario WHERE id = $1';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar um usuário
exports.editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  const query = `
    UPDATE usuario SET nome = $1, email = $2, senha = $3
    WHERE id = $4 RETURNING *`;
  const values = [nome, email, senha, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir um usuário
exports.excluirUsuario = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM usuario WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};