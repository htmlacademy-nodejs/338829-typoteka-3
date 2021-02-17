'use strict';

const {Router} = require(`express`);
const sequelize = require(`../lib/sequelize`)();
const defineModels = require(`../models`);

const articlesRoutes = require(`./articles-routes/articles-routes`);
const categoryRoutes = require(`./categories-routes/categories-routes`);
const searchRoutes = require(`./search-routes/search-routes`);

const {
  CategoryService,
  SearchService,
  ArticleService,
  CommentService
} = require(`../data-service`);

const routes = new Router();
defineModels(sequelize);

(async () => {
  articlesRoutes(routes, new ArticleService(sequelize), new CommentService(sequelize));
  categoryRoutes(routes, new CategoryService(sequelize));
  searchRoutes(routes, new SearchService(sequelize));
})();

module.exports = routes;
