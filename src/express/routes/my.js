'use strict';

const {Router} = require(`express`);
const {axiosApi} = require(`../axios-api/axios-api`);

const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  const {articles} = await axiosApi.getArticles();
  return res.render(`pages/my`, {articles});
});

myRouter.get(`/comments`, async (req, res) => {
  const {articles} = await axiosApi.getArticles({comments: true});
  return res.render(`pages/comments`, {articles: articles.slice(0, 3)});
});

module.exports = myRouter;
