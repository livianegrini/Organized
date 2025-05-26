class Inscricao {
  constructor({ id, data, status, id_usuario, id_evento }) {
    this.id = id;
    this.data = data;
    this.status = status;
    this.id_usuario = id_usuario;
    this.id_evento = id_evento;
  }
}

module.exports = Inscricao;
