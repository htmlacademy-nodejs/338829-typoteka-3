/* eslint-disable camelcase */
'use strict';

const express = require(`express`);
const multer = require(`multer`);

const {axiosApi} = require(`../axios-api/axios-api`);
const {pictureUpload, privateRoute} = require(`../middlewares`);
const {getErrorMessage} = require(`../../utils`);
const {LIMIT_PER_PAGE} = require(`../../constants`);

const upload = multer();
const rootRouter = new express.Router();

rootRouter.use(express.urlencoded({extended: true}));

rootRouter.get(`/`, async (req, res, next) => {
  try {
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
  } catch (error) {
    return next(error);
  }
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
    return res.redirect(`/login`);
  } catch (err) {
    return res.render(`pages/sign-up`, {
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

rootRouter.get(`/login`, (req, res) => {
  return res.render(`pages/login`, {
    login: {
      email: ``,
      password: ``
    },
    message: {}
  });
});

rootRouter.post(`/login`, upload.none(), async (req, res) => {
  const {email, password} = req.body;
  try {
    const {accessToken, refreshToken} = await axiosApi.login({email, password});
    res.cookie(`_ac`, accessToken);
    res.cookie(`_rf`, refreshToken);

    return res.redirect(`/`);
  } catch (err) {
    return res.render(`pages/login`, {
      login: {
        email,
        password: ``
      },
      message: getErrorMessage(err.response.data.message),
    });
  }
});

rootRouter.get(`/logout`, privateRoute, async (req, res, next) => {
  try {
    const {accessToken, refreshToken} = res.locals.auth;
    await axiosApi.logout(accessToken, refreshToken);

    res.clearCookie(`_ac`);
    res.clearCookie(`_rf`);

    return res.redirect(`/login`);
  } catch (error) {
    return next(error);
  }
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
