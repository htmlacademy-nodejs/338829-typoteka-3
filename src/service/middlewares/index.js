'use strict';

const keyValidator = require(`./key-validator/key-validator`);
const articleExist = require(`./article-exist/article-exist`);
const commentExist = require(`./comment-exist/comment-exist`);

module.exports = {
  articleExist,
  commentExist,
  articleValidator: keyValidator([`title`, `createdDate`, `category`, `announce`]),
  commentValidator: keyValidator([`text`])
};
