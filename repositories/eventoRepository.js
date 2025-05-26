const pool = require('../config/db');
const schema = require('../models/eventoModel');

function validar(evento) {
  const { error, value } = schema.validate(evento);
  if (error) throw error;
  return value;
}

async function criar(evento) {
  evento = validar(evento);
  const query = `
    INSERT INTO evento (nome_evento, data, local, descricao)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;
  const values = [evento.nome_evento, evento.data, evento.local, evento.descricao];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function listarTodos() {
  const result = await pool.query('SELECT * FROM evento');
  return result.rows;
}

async function buscarPorId(id) {
  const result = await pool.query('SELECT * FROM evento WHERE id = $1', [id]);
  return result.rows[0];
}

async function atualizar(id, evento) {
  evento = validar(evento);
  const query = `
    UPDATE evento
    SET nome_evento = $1, data = $2, local = $3, descricao = $4
    WHERE id = $5
    RETURNING *`;
  const values = [evento.nome_evento, evento.data, evento.local, evento.descricao, id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function excluir(id) {
  const result = await pool.query('DELETE FROM evento WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
}

module.exports = {
  criar,
  listarTodos,
  buscarPorId,
  atualizar,
  excluir
};
