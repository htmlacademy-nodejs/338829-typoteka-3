'use strict';

const {HttpCode} = require(`../../../constants`);

module.exports = (categoryService) => async (req, res, next) => {
  try {
    const {categoryId} = req.params;
    const category = await categoryService.findOne(categoryId);
    if (!category) {
      return res
          .status(HttpCode.NOT_FOUND)
          .send(`Category with ${categoryId} not found`);
    }
    return next();
  } catch (error) {
    return next(error);
  }
};
