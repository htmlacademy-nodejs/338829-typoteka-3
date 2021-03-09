'use strict';

const Joi = require(`joi`);
const {CommentSchema} = require(`../../constants`);

module.exports = Joi.object({
  text: Joi
    .string()
    .min(CommentSchema.TEXT.MIN)
    .required()
});
