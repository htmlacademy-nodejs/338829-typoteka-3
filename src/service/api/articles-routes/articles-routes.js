'use strict';

const {Router} = require(`express`);
const {HttpCode, TOP_LIMIT} = require(`../../../constants`);

const {
  articleExist,
  articleValidator,
  idArticleValidator,
  idCommentValidator,
  commentExist,
  commentValidator,
  authenticateJwt
} = require(`../../middlewares`);

module.exports = (app, articleService, commentService) => {
  const route = new Router();
  app.use(`/articles`, route);

  route.get(`/`, async (req, res, next) => {
    try {
      const {comments, limit, offset, catId, top, lastComments} = req.query;
      const hasComments = Boolean(comments);

      let result;
      if (catId > 0) {
        result = await articleService.findInCategory(limit, offset, catId, hasComments);
        return res
          .status(HttpCode.OK)
          .json(result);
      }

      if (limit || offset) {
        result = await articleService.findPage(limit, offset, hasComments);
      } else {
        result = await articleService.findAll(hasComments);
      }

      if (typeof top === `string`) {
        const topRes = await articleService.findTopArticles();
        result = {
          ...result,
          articlesTop: topRes.slice(0, TOP_LIMIT)
        };
      }

      if (typeof lastComments === `string`) {
        const lastCommentsRes = await commentService.findLast();
        result = {
          ...result,
          lastComments: lastCommentsRes.slice(0, TOP_LIMIT)
        };
      }

      return res
        .status(HttpCode.OK)
        .json(result);
    } catch (error) {
      return next(error);
    }
  });

  route.post(`/`, [authenticateJwt, articleValidator], async (req, res, next) => {
    try {
      const article = await articleService.create(req.body);
      return res
        .status(HttpCode.CREATED)
        .json(article);
    } catch (error) {
      return next(error);
    }
  });

  route.get(`/:articleId`, [idArticleValidator, articleExist(articleService)], (req, res) => {
    const {article} = res.locals;
    return res
      .status(HttpCode.OK)
      .json(article);
  });

  route.put(`/:articleId`,
      [authenticateJwt, idArticleValidator, articleExist(articleService), articleValidator],
      async (req, res, next) => {
        try {
          const {articleId} = req.params;
          const updateRes = await articleService.update(articleId, req.body);
          return res
            .status(HttpCode.NO_CONTENT)
            .send(updateRes);
        } catch (error) {
          return next(error);
        }
      });

  route.delete(`/:articleId`,
      [authenticateJwt, idArticleValidator, articleExist(articleService)],
      async (req, res, next) => {
        try {
          const {articleId} = req.params;
          const deleteRes = await articleService.delete(articleId);
          return res
            .status(HttpCode.NO_CONTENT)
            .send(deleteRes);
        } catch (error) {
          return next(error);
        }
      });

  route.post(`/:articleId/comments`,
      [authenticateJwt, idArticleValidator, articleExist(articleService), commentValidator],
      async (req, res, next) => {
        try {
          const {articleId} = req.params;
          const {id: userId} = res.locals.user;
          const createRes = await commentService.create(articleId, {...req.body, userId});
          return res
        .status(HttpCode.CREATED)
        .json(createRes);
        } catch (error) {
          return next(error);
        }
      });

  route.get(`/:articleId/comments`, [idArticleValidator, articleExist(articleService)], async (req, res, next) => {
    try {
      const {articleId} = req.params;
      const comments = await commentService.findAll(articleId);
      return res
        .status(HttpCode.OK)
        .json(comments);
    } catch (error) {
      return next(error);
    }
  });

  route.delete(
      `/:articleId/comments/:commentId`,
      [authenticateJwt, idArticleValidator, articleExist(articleService), idCommentValidator, commentExist(commentService)],
      async (req, res, next) => {
        try {
          const {commentId} = req.params;
          const deleteRes = await commentService.delete(commentId);
          return res
            .status(HttpCode.NO_CONTENT)
            .send(deleteRes);
        } catch (error) {
          return next(error);
        }
      });
};
