'use strict';

const articleSchema = require(`./article-schema`);
const commentSchema = require(`./comment-schema`);
const articleIdSchema = require(`./article-id-scheme`);
const commentIdSchema = require(`./comment-id-scheme`);
const userSchema = require(`./user-schema`);
const loginSchema = require(`./login-schema`);

module.exports = {
  articleSchema,
  commentSchema,
  articleIdSchema,
  commentIdSchema,
  userSchema,
  loginSchema
};
