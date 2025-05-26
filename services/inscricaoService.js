const InscricaoRepository = require('../repositories/inscricaoRepository');
const Inscricao = require('../models/inscricao');

class InscricaoService {
  async criarInscricao(data, status, id_usuario, id_evento) {
    const inscricao = new Inscricao({ data, status, id_usuario, id_evento });
    const inscricaoCriada = await InscricaoRepository.criar(inscricao);
    return new Inscricao(inscricaoCriada);
  }

  async listarInscricoes() {
    const inscricoes = await InscricaoRepository.listarTodas();
    return inscricoes.map(i => new Inscricao(i));
  }

  async buscarInscricaoPorId(id) {
    const inscricao = await InscricaoRepository.listarPorId(id);
    return inscricao ? new Inscricao(inscricao) : null;
  }

  async atualizarInscricao(id, data, status, id_usuario, id_evento) {
    const inscricaoAtualizada = await InscricaoRepository.editar(id, {
      data,
      status,
      id_usuario,
      id_evento,
    });
    return inscricaoAtualizada ? new Inscricao(inscricaoAtualizada) : null;
  }

  async excluirInscricao(id) {
    return await InscricaoRepository.excluir(id);
  }
}

module.exports = new InscricaoService();
