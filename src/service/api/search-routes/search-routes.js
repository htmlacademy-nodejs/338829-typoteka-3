'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../../constants`);

module.exports = (app, searchService) => {
  const route = new Router();
  app.use(`/search`, route);

  route.get(`/`, async (req, res, next) => {
    try {
      const {query: queryValue} = req.query;
      if (!queryValue) {
        return res
          .status(HttpCode.BAD_REQUEST)
          .send(`Bad request`);
      }

      const articles = await searchService.findAll(queryValue);
      if (articles.length === 0) {
        return res
          .status(HttpCode.NOT_FOUND)
          .send(`Not found`);
      }

      return res
        .status(HttpCode.OK)
        .json(articles);
    } catch (error) {
      return next(error);
    }
  });
};
