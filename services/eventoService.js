const eventoRepo = require('../repositories/eventoRepository');

async function criarEvento(dados) {
  return eventoRepo.criar(dados);
}

function listarEventos() {
  return eventoRepo.listarTodos();
}

async function buscarEventoPorId(id) {
  const evento = await eventoRepo.buscarPorId(id);
  if (!evento) throw new Error('Evento não encontrado');
  return evento;
}

async function atualizarEvento(id, dados) {
  const atualizado = await eventoRepo.atualizar(id, dados);
  if (!atualizado) throw new Error('Evento não encontrado');
  return atualizado;
}

async function excluirEvento(id) {
  const excluido = await eventoRepo.excluir(id);
  if (!excluido) throw new Error('Evento não encontrado');
  return excluido;
}

module.exports = {
  criarEvento,
  listarEventos,
  buscarEventoPorId,
  atualizarEvento,
  excluirEvento
};
