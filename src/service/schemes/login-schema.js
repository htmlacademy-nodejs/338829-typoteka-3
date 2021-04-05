/* eslint-disable camelcase */
'use strict';

const Joi = require(`joi`);
const {LoginMessage, RegisterMessage} = require(`../../constants`);

module.exports = Joi.object({
  email: Joi
    .string()
    .email({tlds: false})
    .required()
    .messages({
      'string.email': `"email" ${LoginMessage.WRONG_EMAIL}`,
      'any.required': `"email" ${LoginMessage.REQUIRED_FIELD}`
    }),
  password: Joi
    .string()
    .min(6)
    .pattern(new RegExp(`^[a-zA-Z0-9]{3,30}$`))
    .required()
    .messages({
      'string.min': `"password" ${RegisterMessage.MIN_PASSWORD_LENGTH}`,
      'any.required': `"password" ${LoginMessage.REQUIRED_FIELD}`,
      'string.pattern': `"password" ${LoginMessage.WRONG_PASSWORD}`
    })
});
