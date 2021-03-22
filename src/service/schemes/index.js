'use strict';

const articleSchema = require(`./article-schema`);
const commentSchema = require(`./comment-schema`);
const idSchema = require(`./id-schema`);
const userSchema = require(`./user-schema`);

module.exports = {
  articleSchema,
  commentSchema,
  idSchema,
  userSchema
};
