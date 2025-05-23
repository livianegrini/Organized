// controllers/EventoController.js
const pool = require('../config/db');

// Criar um novo evento
exports.criarEvento = async (req, res) => {
  const { nome_evento, data, local, descricao } = req.body;

  const query = 'INSERT INTO evento (nome_evento, data, local, descricao) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [nome_evento, data, local, descricao];

  try {
    const result = await pool.query(query, values);
    const evento = result.rows[0];
    res.status(201).json(evento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todos os eventos
exports.listarEventos = async (req, res) => {
  const query = 'SELECT * FROM evento';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar um evento
exports.listarPorId = async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM evento WHERE id = $1';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar um evento
exports.editarEvento = async (req, res) => {
  const { id } = req.params;
  const { nome_evento, data, local, descricao } = req.body;

  const query = `
    UPDATE evento SET nome_evento = $1, data = $2, local = $3, descricao = $4
    WHERE id = $5 RETURNING *`;
  const values = [nome_evento, data, local, descricao, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir um eventos
exports.excluirEvento = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM evento WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    res.status(200).json({ message: 'Evento excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};