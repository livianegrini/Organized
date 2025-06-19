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
    const query = `
      SELECT 
        i.*,
        e.id AS evento_id, -- Adicionei o ID do evento para facilitar depuração, se quiser
        e.nome_evento AS evento_nome_evento,
        e.local AS evento_local,
        e.data AS evento_data
      FROM inscricao i
      LEFT JOIN evento e ON i.id_evento = e.id -- MUDANÇA AQUI: de JOIN para LEFT JOIN
    `;
    const result = await pool.query(query);
    
    return result.rows.map(row => ({
      ...row, 
      evento: row.evento_id ? { 
        nome_evento: row.evento_nome_evento,
        local: row.evento_local,
        data: row.evento_data
      } : null 
    }));
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
