'use strict';

const Joi = require(`joi`);
const {CategorySchema, CategoryMessage} = require(`../../constants`);

module.exports = Joi.object({
  name: Joi
    .string()
    .min(CategorySchema.NAME.MIN)
    .max(CategorySchema.NAME.MAX)
    .required()
    .messages({
      'string.min': `"name" ${CategoryMessage.MIN_LENGTH}`,
      'string.max': `"name" ${CategoryMessage.MAX_LENGTH}`,
      'any.required': `"name" ${CategoryMessage.REQUIRED_FIELD}`
    }),
  _csrf: Joi
    .string().allow(null, ``),
});
