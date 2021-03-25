/* eslint-disable camelcase */
'use strict';

const express = require(`express`);
const {axiosApi} = require(`../axios-api/axios-api`);
const {pictureUpload} = require(`../middlewares`);
const {getErrorMessage} = require(`../../utils`);
const {LIMIT_PER_PAGE} = require(`../../constants`);

const rootRouter = new express.Router();
rootRouter.use(express.urlencoded({extended: true}));

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

rootRouter.get(`/register`, (req, res) => {
  res.render(`pages/sign-up`, {
    newUser: {
      email: ``,
      name: ``,
      surname: ``,
      password: ``,
      confirm_password: ``,
      avatar: ``
    },
    message: {}
  });
});

rootRouter.post(`/register`, pictureUpload.single(`avatar`), async (req, res) => {
  const {body, file} = req;

  const newUser = {
    ...body,
    avatar: file && file.filename || ``
  };

  try {
    await axiosApi.createUser(newUser);
    res.redirect(`/login`);
  } catch (err) {
    res.render(`pages/sign-up`, {
      newUser: {
        ...newUser,
        avatar: newUser.avatar || body.avatar,
        password: ``,
        confirm_password: ``
      },
      message: getErrorMessage(err.response.data.message)
    });
  }
});

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
