const pool = require('../config/db');
const schema = require('../models/usuarioModel');

function validar(usuario) {
  const { error, value } = schema.validate(usuario);
  if (error) throw error;
  return value;
}

function criar(usuario) {
  usuario = validar(usuario);
  const query = 'INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3) RETURNING *';
  const values = [usuario.nome, usuario.email, usuario.senha];
  return pool.query(query, values).then(res => res.rows[0]);
}

function listarTodos() {
  return pool.query('SELECT * FROM usuario').then(res => res.rows);
}

function buscarPorId(id) {
  return pool.query('SELECT * FROM usuario WHERE id = $1', [id])
    .then(res => res.rows[0]);
}

async function atualizar(id, dados) {
  const usuarioExistente = await buscarPorEmail(dados.email); 

  if (usuarioExistente && String(usuarioExistente.id) !== String(id)) { 
    throw new Error('E-mail já cadastrado.');
  }

  const dadosValidados = validar(dados); 

  const query = 'UPDATE usuario SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *';
  const values = [dadosValidados.nome, dadosValidados.email, dadosValidados.senha, id];
  
  const result = await pool.query(query, values);
  return result.rows[0]; // Retorna o usuário atualizado
}


function excluir(id) {
  return pool.query('DELETE FROM usuario WHERE id = $1 RETURNING *', [id])
    .then(res => res.rows[0]);
}

function buscarPorEmail(email) {
  return pool.query('SELECT * FROM usuario WHERE LOWER(email) = LOWER($1)', [email])
    .then(res => res.rows[0]);
}

module.exports = {
  criar,
  listarTodos,
  buscarPorId,
  atualizar,
  excluir,
  buscarPorEmail
};