'use strict';

const {Router} = require(`express`);
const {axiosApi} = require(`../axios-api/axios-api`);
const {privateRoute} = require(`../middlewares`);

const myRouter = new Router();

myRouter.get(`/`, privateRoute, async (req, res, next) => {
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

myRouter.get(`/comments`, privateRoute, async (req, res, next) => {
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

module.exports = myRouter;
