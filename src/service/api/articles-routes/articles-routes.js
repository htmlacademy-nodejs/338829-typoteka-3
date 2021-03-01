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

  route.get(`/`, async (req, res) => {
    const {comments, limit, offset} = req.query;

    const hasComments = Boolean(comments);
    const result = limit || offset ? await articleService.findPage(limit, offset, hasComments) : await articleService.findAll(hasComments);

    return res
      .status(HttpCode.OK)
      .json(result);
  });

  route.post(`/`, articleValidator, async (req, res) => {
    const article = await articleService.create(req.body);
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

  route.put(`/:articleId`, [articleExist(articleService), articleValidator], async (req, res) => {
    const {articleId} = req.params;
    const updateRes = await articleService.update(articleId, req.body);
    return res
      .status(HttpCode.NO_CONTENT)
      .send(updateRes);
  });

  route.delete(`/:articleId`, articleExist(articleService), async (req, res) => {
    const {articleId} = req.params;
    const deleteRes = await articleService.delete(articleId);
    return res
      .status(HttpCode.NO_CONTENT)
      .send(deleteRes);
  });

  route.post(`/:articleId/comments`, [articleExist(articleService), commentValidator], async (req, res) => {
    const {articleId} = req.params;
    const createRes = await commentService.create(articleId, req.body);
    return res
      .status(HttpCode.CREATED)
      .json(createRes);
  });

  route.get(`/:articleId/comments`, articleExist(articleService), async (req, res) => {
    const {articleId} = req.params;
    const comments = await commentService.findAll(articleId);
    return res
      .status(HttpCode.OK)
      .json(comments);
  });

  route.delete(`/:articleId/comments/:commentId`, [articleExist(articleService), commentExist(commentService)], async (req, res) => {
    const {commentId} = req.params;
    const deleteRes = await commentService.delete(commentId);
    return res
      .status(HttpCode.NO_CONTENT)
      .send(deleteRes);
  });
};
