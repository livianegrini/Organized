const inscricaoService = require('../services/inscricaoService');

exports.criarInscricao = async (req, res) => {
  try {
    const { data, status, id_usuario, id_evento } = req.body;
    const inscricao = await inscricaoService.criarInscricao(data, status, id_usuario, id_evento);
    res.status(201).json(inscricao);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarInscricoes = async (req, res) => {
  try {
    const inscricoes = await inscricaoService.listarInscricoes();
    res.status(200).json(inscricoes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarPorId = async (req, res) => {
  try {
    const inscricao = await inscricaoService.buscarInscricaoPorId(req.params.id);
    if (!inscricao) {
      return res.status(404).json({ message: 'Inscrição não encontrada' });
    }
    res.status(200).json(inscricao);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarInscricao = async (req, res) => {
  try {
    const { data, status, id_usuario, id_evento } = req.body;
    const inscricao = await inscricaoService.atualizarInscricao(
      req.params.id,
      data,
      status,
      id_usuario,
      id_evento
    );
    if (!inscricao) {
      return res.status(404).json({ message: 'Inscrição não encontrada' });
    }
    res.status(200).json(inscricao);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirInscricao = async (req, res) => {
  try {
    const inscricao = await inscricaoService.excluirInscricao(req.params.id);
    if (!inscricao) {
      return res.status(404).json({ message: 'Inscrição não encontrada' });
    }
    res.status(200).json({ message: 'Inscrição excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
