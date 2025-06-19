// models/inscricaoModel.js
const Joi = require('joi');

const schema = Joi.object({
  id: Joi.number().integer().positive(),
  data: Joi.date().required(),
  status: Joi.string().valid('pendente', 'confirmada', 'cancelada').required(),
  id_usuario: Joi.number().integer().positive().required(),
  id_evento: Joi.number().integer().positive().required()
});

module.exports = schema;
