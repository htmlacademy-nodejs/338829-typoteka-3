'use strict';

const {HttpCode} = require(`../../../constants`);

module.exports = (articleService) => async (req, res, next) => {
  try {
    const {articleId} = req.params;
    const hasComments = Boolean(req.query.comments);

    const article = await articleService.findOne(articleId, hasComments);
    if (!article) {
      return res
          .status(HttpCode.NOT_FOUND)
          .send(`Article with ${articleId} not found`);
    }

    res.locals.article = article;
    return next();
  } catch (error) {
    return next(error);
  }
};
