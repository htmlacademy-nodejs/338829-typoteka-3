'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../../constants`);

const {
  articleExist,
  articleValidator,
  commentExist,
  commentValidator
} = require(`../../middlewares`);

module.exports = (app, articleService, commentService) => {
  const route = new Router();
  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    const articles = articleService.findAll();
    return res
      .status(HttpCode.OK)
      .json(articles);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const article = articleService.create(req.body);
    return res
      .status(HttpCode.CREATED)
      .json(article);
  });

  route.get(`/:articleId`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;
    return res
      .status(HttpCode.OK)
      .json(article);
  });

  route.put(`/:articleId`, [articleExist(articleService), articleValidator], (req, res) => {
    const {articleId} = req.params;
    articleService.update(articleId, req.body);
    return res
      .status(HttpCode.NO_CONTENT)
      .send(``);
  });

  route.delete(`/:articleId`, articleExist(articleService), (req, res) => {
    const {articleId} = req.params;
    articleService.delete(articleId);
    return res
      .status(HttpCode.NO_CONTENT)
      .send(``);
  });

  route.post(`/:articleId/comments`, [articleExist(articleService), commentValidator], (req, res) => {
    const {article} = res.locals;
    const comment = commentService.create(article, req.body);
    return res
      .status(HttpCode.CREATED)
      .json(comment);
  });

  route.get(`/:articleId/comments`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;
    const comments = commentService.findAll(article);
    return res
      .status(HttpCode.OK)
      .json(comments);
  });

  route.delete(`/:articleId/comments/:commentId`, [articleExist(articleService), commentExist(commentService)], (req, res) => {
    const {articleId, commentId} = req.params;
    const {article} = res.locals;

    commentService.delete(article, commentId);
    articleService.update(articleId, article);
    return res
      .status(HttpCode.NO_CONTENT)
      .send(``);
  });
};
