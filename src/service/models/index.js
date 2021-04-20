'use strict';

const Aliase = require(`./aliase`);
const defineCategory = require(`./category/category`);
const defineComment = require(`./comment/comment`);
const defineArticle = require(`./article/article`);
const defineArticleCategory = require(`./article-category/article-category`);
const defineUser = require(`./user/user`);
const defineToken = require(`./token/token`);

module.exports = {
  Aliase,
  defineCategory,
  defineComment,
  defineArticle,
  defineArticleCategory,
  defineUser,
  defineToken
};
