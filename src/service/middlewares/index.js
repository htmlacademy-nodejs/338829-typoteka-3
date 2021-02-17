'use strict';

const keyValidator = require(`./key-validator/key-validator`);
const articleExist = require(`./article-exist/article-exist`);
const commentExist = require(`./comment-exist/comment-exist`);
const requestLogger = require(`./request-logger/request-logger`);

module.exports = {
  articleExist,
  commentExist,
  articleValidator: keyValidator([`title`, `createdDate`, `categories`, `announce`]),
  commentValidator: keyValidator([`text`]),
  requestLogger
};
