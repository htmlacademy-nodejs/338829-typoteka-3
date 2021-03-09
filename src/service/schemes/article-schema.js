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
    .min(ArticleSchema.PICTURE.MIN)
    .max(ArticleSchema.PICTURE.MAX),
  fullText: Joi
    .string()
    .max(ArticleSchema.FULL_TEXT.MAX)
});
