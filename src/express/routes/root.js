'use strict';

const {Router} = require(`express`);
const {axiosApi} = require(`../axios-api/axios-api`);
const {LIMIT_PER_PAGE} = require(`../../constants`);

const rootRouter = new Router();

rootRouter.get(`/`, async (req, res) => {
  const {page = 1} = req.query;

  const limit = LIMIT_PER_PAGE;
  const offset = (Number(page) - 1) * limit;

  const [
    {count, articles},
    categories
  ] = await Promise.all([
    axiosApi.getArticles({limit, offset, comments: true}),
    axiosApi.getCategories({count: true})
  ]);

  if (count === 0) {
    return res.render(`pages/main-empty`);
  }

  const totalPages = Math.ceil(count / limit);

  return res.render(`pages/main`, {
    articles,
    categories,
    totalPages,
    page: Number(page)
  });
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
