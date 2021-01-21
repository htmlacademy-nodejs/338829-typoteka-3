'use strict';

const {Router} = require(`express`);
const {axiosApi} = require(`../axios-api/axios-api`);
const rootRouter = new Router();

rootRouter.get(`/`, async (req, res) => {
  const articles = await axiosApi.getArticles();
  if (articles.length === 0) {
    return res.render(`pages/main-empty`);
  }

  const categories = axiosApi.getCategories();
  return res.render(`pages/main`, {articles, categories});
});

rootRouter.get(`/register`, (req, res) => res.render(`pages/sign-up`));
rootRouter.get(`/login`, (req, res) => res.render(`pages/login`));

rootRouter.get(`/search`, async (req, res) => {
  try {
    const {search: searchValue} = req.query;
    const articles = await axiosApi.searchArticles(searchValue);
    res.render(`pages/search`, {articles, searchValue});
  } catch (error) {
    res.render(`pages/search`, {articles: []});
  }
});

rootRouter.get(`/categories`, (req, res) => res.render(`pages/all-categories`));

module.exports = rootRouter;
