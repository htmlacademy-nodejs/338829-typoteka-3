'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../../constants`);
const {
  categoryExist,
  categoryValidator,
  authenticateJwt,
  idCategoryValidator
} = require(`../../middlewares`);

module.exports = (app, categoryService) => {
  const route = new Router();
  app.use(`/categories`, route);

  route.get(`/`, async (req, res, next) => {
    try {
      const hasCount = Boolean(req.query.count);
      const categories = await categoryService.findAll(hasCount);
      return res
        .status(HttpCode.OK)
        .json(categories);
    } catch (error) {
      return next(error);
    }
  });

  route.post(`/`, [authenticateJwt, categoryValidator], async (req, res, next) => {
    try {
      const category = await categoryService.create(req.body);
      return res
        .status(HttpCode.CREATED)
        .json(category);
    } catch (error) {
      return next(error);
    }
  });

  route.put(`/:categoryId`,
      [authenticateJwt, idCategoryValidator, categoryExist(categoryService)],
      async (req, res, next) => {
        try {
          const {categoryId} = req.params;
          const updateRes = await categoryService.update(categoryId, req.body);
          return res
            .status(HttpCode.NO_CONTENT)
            .send(updateRes);
        } catch (error) {
          return next(error);
        }
      });

  route.delete(`/:categoryId`,
      [authenticateJwt, idCategoryValidator, categoryExist(categoryService)],
      async (req, res, next) => {
        try {
          const {categoryId} = req.params;
          const deletedRes = await categoryService.delete(categoryId);
          return res
            .status(HttpCode.NO_CONTENT)
            .send(deletedRes);
        } catch (error) {
          return next(error);
        }
      });
};
