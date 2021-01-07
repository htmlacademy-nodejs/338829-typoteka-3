'use strict';

const {Router} = require(`express`);
const getMockData = require(`../lib/get-mock-data`);
const categoryRoutes = require(`./categories-routes/categories-routes`);

const {
  CategoryService
} = require(`../data-service`);

const routes = new Router();

(async () => {
  const mockData = await getMockData();
  categoryRoutes(routes, new CategoryService(mockData));
})();

module.exports = routes;
