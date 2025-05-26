const pool = require('../config/db');

class InscricaoRepository {
  async criar(inscricao) {
    const query = `
      INSERT INTO inscricao (data, status, id_usuario, id_evento)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;
    const values = [inscricao.data, inscricao.status, inscricao.id_usuario, inscricao.id_evento];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async listarTodas() {
    const result = await pool.query('SELECT * FROM inscricao');
    return result.rows;
  }

  async listarPorId(id) {
    const result = await pool.query('SELECT * FROM inscricao WHERE id = $1', [id]);
    return result.rows[0];
  }

  async editar(id, inscricao) {
    const query = `
      UPDATE inscricao
      SET data = $1, status = $2, id_usuario = $3, id_evento = $4
      WHERE id = $5
      RETURNING *`;
    const values = [inscricao.data, inscricao.status, inscricao.id_usuario, inscricao.id_evento, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async excluir(id) {
    const result = await pool.query('DELETE FROM inscricao WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = new InscricaoRepository();
