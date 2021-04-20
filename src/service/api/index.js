'use strict';

const articlesRoutes = require(`./articles-routes/articles-routes`);
const categoryRoutes = require(`./categories-routes/categories-routes`);
const searchRoutes = require(`./search-routes/search-routes`);
const userRoutes = require(`./user-routes/user-routes`);

module.exports = {
  articlesRoutes,
  categoryRoutes,
  searchRoutes,
  userRoutes
};
