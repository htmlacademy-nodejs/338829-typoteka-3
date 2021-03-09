'use strict';

const joiValidator = require(`./joi-validator/joi-validator`);
const articleExist = require(`./article-exist/article-exist`);
const commentExist = require(`./comment-exist/comment-exist`);
const requestLogger = require(`./request-logger/request-logger`);

const {
  articleSchema,
  commentSchema,
  idSchema
} = require(`../schemes`);

module.exports = {
  requestLogger,
  articleExist: articleExist(idSchema),
  commentExist: commentExist(idSchema),
  articleValidator: joiValidator(articleSchema),
  commentValidator: joiValidator(commentSchema)
};
