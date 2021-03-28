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
  return res.render(`pages/sign-up`, {
    newUser: {
      email: ``,
      name: ``,
      surname: ``,
      password: ``,
      confirm_password: ``,
      avatar: ``
    },
    login: {
      email: ``,
      password: ``
    },
    regMessage: {},
    loginMessage: {}
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
    return res.redirect(`/login`);
  } catch (err) {
    return res.render(`pages/sign-up`, {
      newUser: {
        ...newUser,
        avatar: newUser.avatar || body.avatar,
        password: ``,
        confirm_password: ``
      },
      login: {
        email: ``,
        password: ``
      },
      regMessage: getErrorMessage(err.response.data.message),
      loginMessage: {}
    });
  }
});

rootRouter.get(`/login`, (req, res) => {
  return res.render(`pages/login`, {
    newUser: {
      email: ``,
      name: ``,
      surname: ``,
      password: ``,
      confirm_password: ``,
      avatar: ``
    },
    login: {
      email: ``,
      password: ``
    },
    regMessage: {},
    loginMessage: {}
  });
});

rootRouter.get(`/search`, async (req, res) => {
  const {search: searchValue} = req.query;

  try {
    const articles = await axiosApi.searchArticles(searchValue);
    return res.render(`pages/search`, {
      articles,
      searchValue
    });
  } catch (error) {
    return res.render(`pages/search`, {
      articles: [],
      searchValue: searchValue ? searchValue : null
    });
  }
});

rootRouter.get(`/categories`, async (req, res, next) => {
  try {
    const categories = await axiosApi.getCategories();
    return res.render(`pages/all-categories`, {categories});
  } catch (error) {
    return next(error);
  }

});

module.exports = rootRouter;
