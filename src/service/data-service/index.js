'use strict';

const CategoryService = require(`./category-service/category-service`);
const SearchService = require(`./search-service/search-service`);
const ArticleService = require(`./article-service/article-service`);
const CommentService = require(`./comment-service/comment-service`);
const UsersService = require(`./user-service/user-service`);

module.exports = {
  CategoryService,
  SearchService,
  ArticleService,
  CommentService,
  UsersService
};
