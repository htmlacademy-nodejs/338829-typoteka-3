'use strict';

const Joi = require(`joi`);
const {ArticleSchema} = require(`../../constants`);

module.exports = Joi.object({
  title: Joi
    .string()
    .min(ArticleSchema.TITLE.MIN)
    .max(ArticleSchema.TITLE.MAX)
    .required(),
  createdAt: Joi
    .date()
    .required(),
  announce: Joi
    .string()
    .min(ArticleSchema.ANNOUNCE.MIN)
    .max(ArticleSchema.ANNOUNCE.MAX)
    .required(),
  categories: Joi
    .array()
    .items(Joi.string())
    .min(ArticleSchema.CATEGORIES.MIN)
    .required(),
  picture: Joi
    .string()
    .allow(null, ``)
    .pattern(new RegExp(`(?:jpg|png)`)),
  fullText: Joi
    .string()
    .allow(null, ``)
    .max(ArticleSchema.FULL_TEXT.MAX)
});
