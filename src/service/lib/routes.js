'use strict';

const {Router} = require(`express`);
const createSequelize = require(`./sequelize`);
const defineModels = require(`./define-models`);

const {
  articlesRoutes,
  categoryRoutes,
  searchRoutes,
  userRoutes
} = require(`../api`);

const routes = new Router();

const {
  CategoryService,
  SearchService,
  ArticleService,
  CommentService,
  UsersService,
  TokenService
} = require(`../data-service`);

(async () => {
  const sequelize = createSequelize();
  defineModels(sequelize);

  articlesRoutes(routes, new ArticleService(sequelize), new CommentService(sequelize));
  categoryRoutes(routes, new CategoryService(sequelize));
  searchRoutes(routes, new SearchService(sequelize));
  userRoutes(routes, new UsersService(sequelize), new TokenService(sequelize));
})();

module.exports = {routes};
