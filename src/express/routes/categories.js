'use strict';
const express = require(`express`);
const multer = require(`multer`);

const {axiosApi} = require(`../axios-api/axios-api`);
const {adminRoute, csrfProtection} = require(`../middlewares`);
const {getErrorMessage} = require(`../../utils`);

const upload = multer();
const categoryRouter = new express.Router();

categoryRouter.use(express.urlencoded({extended: true}));

categoryRouter.get(`/`, [adminRoute, csrfProtection], async (req, res, next) => {
  const {isAuth, isAdmin, userData} = res.locals.auth;
  try {
    const categories = await axiosApi.getCategories({count: true});
    return res.render(`pages/all-categories`, {
      isAuth,
      isAdmin,
      userData,
      categories,
      message: {},
      csrfToken: req.csrfToken()
    });
  } catch (error) {
    return next(error);
  }
});

categoryRouter.post(`/`, [adminRoute, upload.none(), csrfProtection], async (req, res) => {
  const {isAuth, isAdmin, userData, accessToken} = res.locals.auth;
  try {
    await axiosApi.createCategory(req.body, accessToken);
    return res.redirect(`/categories`);
  } catch (err) {
    const categories = await axiosApi.getCategories();
    return res.render(`pages/all-categories`, {
      isAuth,
      isAdmin,
      userData,
      categories,
      message: getErrorMessage(err.response.data.message),
      csrfToken: req.csrfToken()
    });
  }
});

categoryRouter.post(`/:categoryId`, [adminRoute, upload.none(), csrfProtection], async (req, res) => {
  const {categoryId} = req.params;
  const {isAuth, isAdmin, userData, accessToken} = res.locals.auth;
  try {
    await axiosApi.updateCategory(categoryId, req.body, accessToken);
    return res.redirect(`/categories`);
  } catch (err) {
    const categories = await axiosApi.getCategories();
    return res.render(`pages/all-categories`, {
      isAuth,
      isAdmin,
      userData,
      categories,
      message: getErrorMessage(err.response.data.message),
      csrfToken: req.csrfToken()
    });
  }
});

categoryRouter.post(`/:categoryId/delete`, [adminRoute, upload.none(), csrfProtection], async (req, res) => {
  const {categoryId} = req.params;
  const {isAuth, isAdmin, userData, accessToken} = res.locals.auth;
  try {
    await axiosApi.deleteCategory(categoryId, accessToken);
    return res.redirect(`/categories`);
  } catch (err) {
    const categories = await axiosApi.getCategories();
    return res.render(`pages/all-categories`, {
      isAuth,
      isAdmin,
      userData,
      categories,
      message: getErrorMessage(err.response.data.message),
      csrfToken: req.csrfToken()
    });
  }
});

module.exports = categoryRouter;
