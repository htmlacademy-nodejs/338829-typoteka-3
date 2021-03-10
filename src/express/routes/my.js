'use strict';

const express = require(`express`);
const {axiosApi} = require(`../axios-api/axios-api`);

const myRouter = new express.Router();
myRouter.use(express.urlencoded());

myRouter.get(`/`, async (req, res) => {
  const {articles} = await axiosApi.getArticles();
  return res.render(`pages/my`, {articles});
});

myRouter.get(`/comments`, async (req, res) => {
  const {articles} = await axiosApi.getArticles({comments: true});
  return res.render(`pages/comments`, {articles: articles.slice(0, 3)});
});

myRouter.post(`/comments`, async (req, res) => {
  const {text, articleId} = req.body;

  try {
    await axiosApi.createComment(articleId, {text});
  } catch (error) {
    console.log(error);
  }

  res.redirect(`back`);
});

module.exports = myRouter;
