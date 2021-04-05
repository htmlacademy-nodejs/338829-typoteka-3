'use strict';

const joiValidator = require(`./joi-validator/joi-validator`);
const articleExist = require(`./article-exist/article-exist`);
const commentExist = require(`./comment-exist/comment-exist`);
const requestLogger = require(`./request-logger/request-logger`);
const userExits = require(`./user-exist/user-exist`);
const userAuthenticate = require(`./user-authenticate/user-authenticate`);
const authenticateJwt = require(`./authenticate-jwt/authenticate-jwt`);

const {
  articleSchema,
  commentSchema,
  articleIdSchema,
  commentIdSchema,
  userSchema,
  loginSchema
} = require(`../schemes`);

module.exports = {
  requestLogger,
  articleExist,
  commentExist,
  userExits,
  authenticateJwt,
  userAuthenticate,
  idArticleValidator: joiValidator(`params`, articleIdSchema),
  idCommentValidator: joiValidator(`params`, commentIdSchema),
  articleValidator: joiValidator(`body`, articleSchema),
  commentValidator: joiValidator(`body`, commentSchema),
  userValidator: joiValidator(`body`, userSchema),
  loginValidator: joiValidator(`body`, loginSchema)
};
