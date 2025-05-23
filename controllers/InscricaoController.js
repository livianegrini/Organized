// controllers/InscricaoController.js
const pool = require('../config/db');

// Criar uma nova inscricao
exports.criarInscricao = async (req, res) => {
  const { data, status, id_usuario, id_evento } = req.body;

  const query = 'INSERT INTO inscricao (data, status, id_usuario, id_evento) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [data, status, id_usuario, id_evento];

  try {
    const result = await pool.query(query, values);
    const inscricao = result.rows[0];
    res.status(201).json(inscricao);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as inscricoes
exports.listarInscricoes = async (req, res) => {
  const query = 'SELECT * FROM inscricao';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar uma inscricao
exports.listarPorId = async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM inscricao WHERE id = $1';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Inscrição não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma inscrição
exports.editarInscricao = async (req, res) => {
  const { id } = req.params;
  const { data, status, id_usuario, id_evento } = req.body;

  const query = `
    UPDATE inscricao SET data = $1, status = $2, id_usuario = $3, id_evento = $4
    WHERE id = $5 RETURNING *`;
  const values = [data, status, id_usuario, id_evento, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Inscrição não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma inscricao
exports.excluirInscricao = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM inscricao WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Inscrição não encontrada' });
    }
    res.status(200).json({ message: 'Inscrição excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};