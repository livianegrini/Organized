const usuarioRepo = require('../repositories/usuarioRepository');

const NOMES_RESERVADOS = new Set(['admin', 'root', 'superuser']);
const DOMINIOS_PERMITIDOS = ['gmail.com', 'outlook.com', 'hotmail.com'];

function validarNome(nome) {
  if (NOMES_RESERVADOS.has(nome.toLowerCase())) {
    throw new Error('Nome de usuário reservado.');
  }
}

function validarDominioEmail(email) {
  const dominio = email.split('@')[1]?.toLowerCase();
  if (!DOMINIOS_PERMITIDOS.includes(dominio)) {
    throw new Error(`Domínio de e-mail não permitido: ${dominio}`);
  }
}

async function validarEmailUnico(email, ignorarId = null) {
  const existente = await usuarioRepo.buscarPorEmail(email);
  if (existente && existente.id !== ignorarId) {
    throw new Error('E-mail já cadastrado.');
  }
}

async function criarUsuario(dados) {
  validarNome(dados.nome);
  validarDominioEmail(dados.email);
  await validarEmailUnico(dados.email);
  return usuarioRepo.criar(dados);
}

function listarUsuarios() {
  return usuarioRepo.listarTodos();
}

async function buscarUsuarioPorId(id) {
  const usuario = await usuarioRepo.buscarPorId(id);
  if (!usuario) throw new Error('Usuário não encontrado');
  return usuario;
}

async function atualizarUsuario(id, dados) {
  validarNome(dados.nome);
  validarDominioEmail(dados.email);
  await validarEmailUnico(dados.email, parseInt(id));
  const atualizado = await usuarioRepo.atualizar(id, dados);
  if (!atualizado) throw new Error('Usuário não encontrado');
  return atualizado;
}

async function excluirUsuario(id) {
  const excluido = await usuarioRepo.excluir(id);
  if (!excluido) throw new Error('Usuário não encontrado');
  return excluido;
}

module.exports = {
  criarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  excluirUsuario
};
