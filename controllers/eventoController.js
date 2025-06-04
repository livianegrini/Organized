const eventoService = require('../services/eventoService');


async function criarEvento(req, res) {
  try {
    const evento = await eventoService.criarEvento(req.body);
    res.status(201).json(evento);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function listarEventos(req, res) {
  try {
    const eventos = await eventoService.listarEventos();
    res.status(200).json(eventos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function listarPorId(req, res) {
  try {
    const evento = await eventoService.buscarEventoPorId(req.params.id);
    res.status(200).json(evento);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function editarEvento(req, res) {
  try {
    const evento = await eventoService.atualizarEvento(req.params.id, req.body);
    res.status(200).json(evento);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function excluirEvento(req, res) {
  try {
    await eventoService.excluirEvento(req.params.id);
    res.status(200).json({ message: 'Evento excluído com sucesso' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  criarEvento,
  listarEventos,
  listarPorId,
  editarEvento,
  excluirEvento
};
