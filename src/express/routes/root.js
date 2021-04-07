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
    const {isAuth, isAdmin, userData} = res.locals.auth;

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
      return res.render(`pages/main-empty`, {
        isAuth,
        isAdmin,
        userData
      });
    }

    const totalPages = Math.ceil(count / limit);
    return res.render(`pages/main`, {
      isAuth,
      isAdmin,
      userData,
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
  const {isAuth, isAdmin, userData} = res.locals.auth;
  return res.render(`pages/sign-up`, {
    newUser: {
      email: ``,
      name: ``,
      surname: ``,
      password: ``,
      confirm_password: ``,
      avatar: ``
    },
    message: {},
    userData,
    isAuth,
    isAdmin
  });
});

rootRouter.post(`/register`, pictureUpload.single(`avatar`), async (req, res) => {
  const {body, file} = req;
  const {isAuth, isAdmin, userData} = res.locals.auth;

  const newUser = {
    ...body,
    avatar: file && file.filename || ``
  };

  try {
    await axiosApi.createUser(newUser);
    return res.redirect(`/login`);
  } catch (err) {
    return res.render(`pages/sign-up`, {
      isAuth,
      isAdmin,
      userData,
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
  const {isAuth, isAdmin, userData} = res.locals.auth;
  return res.render(`pages/login`, {
    login: {
      email: ``,
      password: ``
    },
    message: {},
    isAuth,
    isAdmin,
    userData
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
    const {isAuth, isAdmin, userData} = res.locals.auth;
    return res.render(`pages/login`, {
      login: {
        email,
        password: ``
      },
      message: getErrorMessage(err.response.data.message),
      isAuth,
      isAdmin,
      userData
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
  const {isAuth, isAdmin, userData} = res.locals.auth;
  try {
    const articles = await axiosApi.searchArticles(searchValue);
    return res.render(`pages/search`, {
      isAuth,
      isAdmin,
      userData,
      articles,
      searchValue
    });
  } catch (error) {
    return res.render(`pages/search`, {
      isAuth,
      isAdmin,
      userData,
      articles: [],
      searchValue: searchValue ? searchValue : null
    });
  }
});

rootRouter.get(`/categories`, async (req, res, next) => {
  const {isAuth, isAdmin, userData} = res.locals.auth;
  try {
    const categories = await axiosApi.getCategories();
    return res.render(`pages/all-categories`, {
      isAuth,
      isAdmin,
      userData,
      categories
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = rootRouter;
