'use strict';

const joiValidator = require(`./joi-validator/joi-validator`);
const articleExist = require(`./article-exist/article-exist`);
const commentExist = require(`./comment-exist/comment-exist`);
const requestLogger = require(`./request-logger/request-logger`);
const userExits = require(`./user-exist/user-exist`);

const {
  articleSchema,
  commentSchema,
  articleIdSchema,
  commentIdSchema,
  userSchema
} = require(`../schemes`);

module.exports = {
  requestLogger,
  articleExist,
  commentExist,
  userExits,
  idArticleValidator: joiValidator(`params`, articleIdSchema),
  idCommentValidator: joiValidator(`params`, commentIdSchema),
  articleValidator: joiValidator(`body`, articleSchema),
  commentValidator: joiValidator(`body`, commentSchema),
  userValidator: joiValidator(`body`, userSchema)
};
