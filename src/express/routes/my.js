'use strict';

const {Router} = require(`express`);
const {axiosApi} = require(`../axios-api/axios-api`);
const {adminRoute} = require(`../middlewares`);

const {HttpCode} = require(`../../constants`);
const {getErrorMessage} = require(`../../utils`);

const myRouter = new Router();

myRouter.get(`/`, adminRoute, async (req, res, next) => {
  try {
    const {isAuth, isAdmin, userData} = res.locals.auth;
    const {articles} = await axiosApi.getArticles();
    return res.render(`pages/my`, {
      isAuth,
      isAdmin,
      userData,
      articles
    });
  } catch (error) {
    return next(error);
  }
});

myRouter.get(`/comments`, adminRoute, async (req, res, next) => {
  try {
    const {isAuth, isAdmin, userData} = res.locals.auth;
    const {articles} = await axiosApi.getArticles({comments: true});
    return res.render(`pages/comments`, {
      isAuth,
      isAdmin,
      userData,
      articles
    });
  } catch (error) {
    return next(error);
  }
});

myRouter.delete(`/comments/:commentId`, adminRoute, async (req, res) => {
  try {
    const {commentId} = req.params;
    const {articleId} = req.query;
    const {accessToken} = res.locals.auth;

    await axiosApi.deleteComment(articleId, commentId, accessToken);
    return res
      .status(HttpCode.NO_CONTENT)
      .send(``);
  } catch (err) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .send(getErrorMessage(err.response.data.message));
  }
});

module.exports = myRouter;
