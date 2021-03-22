'use strict';

const joiValidator = require(`./joi-validator/joi-validator`);
const idValidator = require(`./id-validator/id-validator`);

const articleExist = require(`./article-exist/article-exist`);
const commentExist = require(`./comment-exist/comment-exist`);
const requestLogger = require(`./request-logger/request-logger`);
const userExits = require(`./user-exist/user-exist`);

const {
  articleSchema,
  commentSchema,
  idSchema,
  userSchema
} = require(`../schemes`);

module.exports = {
  requestLogger,
  articleExist,
  commentExist,
  userExits,
  idArticleValidator: idValidator(`articleId`, idSchema),
  idCommentValidator: idValidator(`commentId`, idSchema),
  articleValidator: joiValidator(articleSchema),
  commentValidator: joiValidator(commentSchema),
  userValidator: joiValidator(userSchema)
};
