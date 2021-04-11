'use strict';

const Joi = require(`joi`);

module.exports = Joi.object({
  categoryId: Joi.number().integer().positive().required()
});

