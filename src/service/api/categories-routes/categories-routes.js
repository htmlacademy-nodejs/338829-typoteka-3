'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../../constants`);

module.exports = (app, categoryService) => {
  const route = new Router();
  app.use(`/categories`, route);

  route.get(`/`, async (req, res) => {
    const hasCount = Boolean(req.query.count);
    const categories = await categoryService.findAll(hasCount);

    return res
      .status(HttpCode.OK)
      .json(categories);
  });
};
