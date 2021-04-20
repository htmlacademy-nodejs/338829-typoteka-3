'use strict';
const express = require(`express`);
const multer = require(`multer`);

const {axiosApi} = require(`../axios-api/axios-api`);
const {adminRoute, csrfProtection} = require(`../middlewares`);
const {getErrorMessage, getMyComments} = require(`../../utils`);

const upload = multer();
const myRouter = new express.Router();

myRouter.use(express.urlencoded({extended: true}));

myRouter.get(`/`, [adminRoute, csrfProtection], async (req, res, next) => {
  try {
    const {isAuth, isAdmin, userData} = res.locals.auth;
    const {articles} = await axiosApi.getArticles();
    return res.render(`pages/my`, {
      isAuth,
      isAdmin,
      userData,
      articles,
      csrfToken: req.csrfToken()
    });
  } catch (error) {
    return next(error);
  }
});

myRouter.get(`/comments`, [adminRoute, csrfProtection], async (req, res, next) => {
  try {
    const {isAuth, isAdmin, userData} = res.locals.auth;
    const {articles} = await axiosApi.getArticles({comments: true});

    return res.render(`pages/comments`, {
      isAuth,
      isAdmin,
      userData,
      articles,
      comments: getMyComments(articles),
      csrfToken: req.csrfToken(),
      message: {}
    });
  } catch (error) {
    return next(error);
  }
});

myRouter.post(`/comments/:commentId`, [adminRoute, upload.none(), csrfProtection], async (req, res) => {
  try {
    const {commentId} = req.params;
    const {articleId} = req.body;
    const {accessToken} = res.locals.auth;

    await axiosApi.deleteComment(articleId, commentId, accessToken);
    return res.redirect(`/my/comments`);
  } catch (err) {
    const {isAuth, isAdmin, userData} = res.locals.auth;
    const {articles} = await axiosApi.getArticles({comments: true});

    return res.render(`pages/comments`, {
      isAuth,
      isAdmin,
      userData,
      articles,
      comments: getMyComments(articles),
      csrfToken: req.csrfToken(),
      message: getErrorMessage(err.response.data.message),
    });
  }
});

myRouter.post(`/:articleId`, [adminRoute, csrfProtection], async (req, res) => {
  const {articleId} = req.params;
  const {isAuth, isAdmin, userData, accessToken} = res.locals.auth;
  try {
    await axiosApi.deleteArticle(articleId, accessToken);
    return res.redirect(`/my`);
  } catch (err) {
    const {articles} = await axiosApi.getArticles();
    return res.render(`pages/my`, {
      isAuth,
      isAdmin,
      userData,
      articles,
      csrfToken: req.csrfToken()
    });
  }
});

module.exports = myRouter;
