'use strict';

const Joi = require(`joi`);

module.exports = Joi.object({
  name: Joi
    .string() .required(),
  _csrf: Joi
    .string().allow(null, ``),
});
