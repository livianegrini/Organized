// models/usuarioModel.js
const Joi = require('joi');

const schema = Joi.object({
  id: Joi.number().integer().positive(),
  nome: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required()
});

module.exports = schema;
