'use strict';

const {Router} = require(`express`);
const {axiosApi} = require(`../axios-api/axios-api`);

const myRouter = new Router();

myRouter.get(`/`, async (req, res, next) => {
  try {
    const {articles} = await axiosApi.getArticles();
    return res.render(`pages/my`, {articles});
  } catch (error) {
    return next(error);
  }
});

myRouter.get(`/comments`, async (req, res, next) => {
  try {
    const {articles} = await axiosApi.getArticles({comments: true});
    return res.render(`pages/comments`, {articles: articles.slice(0, 3)});
  } catch (error) {
    return next(error);
  }
});

module.exports = myRouter;
