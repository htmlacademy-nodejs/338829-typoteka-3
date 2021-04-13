'use strict';

const Joi = require(`joi`);
const {CommentMessage, CommentSchema} = require(`../../constants`);

module.exports = Joi.object({
  text: Joi
    .string()
    .min(CommentSchema.TEXT.MIN)
    .required()
    .messages({
      'string.min': `"text" ${CommentMessage.MIN_LENGTH}`,
      'string.empty': `"text" ${CommentMessage.EMPTY_VALUE}`
    }),
});
