'use strict';

const {Router} = require(`express`);
const {axiosApi} = require(`../axios-api/axios-api`);
const rootRouter = new Router();

rootRouter.get(`/`, async (req, res) => {
  const hasComments = true;
  const articles = await axiosApi.getArticles(hasComments);

  if (articles.length === 0) {
    return res.render(`pages/main-empty`);
  }

  const hasCount = true;
  const categories = await axiosApi.getCategories(hasCount);

  return res.render(`pages/main`, {articles, categories});
});

rootRouter.get(`/register`, (req, res) => res.render(`pages/sign-up`));
rootRouter.get(`/login`, (req, res) => res.render(`pages/login`));

rootRouter.get(`/search`, async (req, res) => {
  const {search: searchValue} = req.query;

  try {
    const articles = await axiosApi.searchArticles(searchValue);
    res.render(`pages/search`, {
      articles,
      searchValue
    });
  } catch (error) {
    res.render(`pages/search`, {
      articles: [],
      searchValue: searchValue ? searchValue : null
    });
  }
});

rootRouter.get(`/categories`, async (req, res) => {
  const categories = await axiosApi.getCategories();
  return res.render(`pages/all-categories`, {categories});
});

module.exports = rootRouter;
