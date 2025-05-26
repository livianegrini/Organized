const Joi = require('joi');

const schema = Joi.object({
  id: Joi.number().integer().positive(),
  nome_evento: Joi.string().min(3).required(),
  data: Joi.date().iso().required(),
  local: Joi.string().min(3).required(),
  descricao: Joi.string().allow('').optional()
});

module.exports = schema;
