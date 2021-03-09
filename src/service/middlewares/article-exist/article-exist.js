'use strict';

const {HttpCode} = require(`../../../constants`);

module.exports = (scheme) => (articleService) => async (req, res, next) => {
  const {articleId} = req.params;

  try {
    await scheme.validateAsync({id: articleId}, {abortEarly: false});

    const hasComments = Boolean(req.query.comments);
    const article = await articleService.findOne(articleId, hasComments);

    if (!article) {
      return res
          .status(HttpCode.NOT_FOUND)
          .send(`Article with ${articleId} not found`);
    }

    res.locals.article = article;
  } catch (error) {
    const {details = []} = error;
    const text = details.map((errorText) => errorText.message).join(`, `);
    return res
      .status(HttpCode.BAD_REQUEST)
      .send(text);
  }

  return next();
};
