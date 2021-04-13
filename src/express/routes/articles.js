'use strict';

const express = require(`express`);
const {pictureUpload, privateRoute, adminRoute, csrfProtection} = require(`../middlewares`);
const {HttpCode} = require(`../../constants`);
const {axiosApi} = require(`../axios-api/axios-api`);
const {getCategoryArticle, getPictureArticle, getErrorMessage} = require(`../../utils`);
const {LIMIT_PER_PAGE} = require(`../../constants`);

const articlesRouter = new express.Router();
articlesRouter.use(express.urlencoded({extended: true}));

articlesRouter.get(`/category/:id`, async (req, res, next) => {
  try {
    const {isAuth, isAdmin, userData} = res.locals.auth;

    const catId = Number(req.params.id);
    const {page = 1} = req.query;

    const limit = LIMIT_PER_PAGE;
    const offset = (Number(page) - 1) * limit;

    const [categories, {count, articles}] = await Promise.all([
      axiosApi.getCategories({count: true}),
      axiosApi.getArticles({limit, offset, comments: true, catId})
    ]);

    const totalPages = Math.ceil(count / limit);
    return res.render(`pages/articles-by-category`, {
      isAuth,
      isAdmin,
      userData,
      categories,
      catId,
      articles,
      totalPages,
      page: Number(page)
    });
  } catch (error) {
    return next(error);
  }
});

articlesRouter.get(`/add`, [adminRoute, csrfProtection], async (req, res, next) => {
  try {
    const {isAuth, isAdmin, userData} = res.locals.auth;
    const categories = await axiosApi.getCategories();
    return res.render(`pages/post-new`, {
      isAuth,
      isAdmin,
      userData,
      newArticle: {
        categories: []
      },
      categories,
      message: {},
      csrfToken: req.csrfToken()
    });
  } catch (error) {
    return next(error);
  }
});

articlesRouter.post(`/add`, [adminRoute, pictureUpload.single(`img`), csrfProtection], async (req, res) => {
  const {body, file} = req;

  const newArticle = {
    title: body.title,
    picture: getPictureArticle(file, body),
    announce: body.announce,
    fullText: body.fullText,
    createdAt: body.date,
    categories: getCategoryArticle(body.categories)
  };

  const {isAuth, isAdmin, userData, accessToken} = res.locals.auth;
  try {
    await axiosApi.createArticle(newArticle, accessToken);
    return res.redirect(`/my`);
  } catch (err) {
    const categories = await axiosApi.getCategories();
    return res.render(`pages/post-new`, {
      isAuth,
      isAdmin,
      userData,
      newArticle,
      categories,
      message: getErrorMessage(err.response.data.message),
      csrfToken: req.csrfToken()
    });
  }
});

articlesRouter.get(`/edit/:id`, [adminRoute, csrfProtection], async (req, res) => {
  const {isAuth, isAdmin, userData} = res.locals.auth;

  try {
    const {id} = req.params;
    const categories = await axiosApi.getCategories({count: true});
    const editArticle = await axiosApi.getArticle({id});

    return res.render(`pages/post-edit`, {
      isAuth,
      isAdmin,
      userData,
      articleId: id,
      editArticle: {
        ...editArticle,
        categories: editArticle.categories.map((cat) => String(cat.id))
      },
      categories,
      message: {},
      csrfToken: req.csrfToken()
    });
  } catch (error) {
    return res
      .status(HttpCode.NOT_FOUND)
      .render(`errors/404`, {
        isAuth,
        isAdmin,
        userData
      });
  }
});

articlesRouter.post(`/edit/:id`, [adminRoute, pictureUpload.single(`img`), csrfProtection], async (req, res) => {
  const {id} = req.params;
  const {body, file} = req;

  const editArticle = {
    title: body.title,
    picture: getPictureArticle(file, body),
    announce: body.announce,
    fullText: body.fullText,
    createdAt: body.date,
    categories: getCategoryArticle(body.categories)
  };

  const {isAuth, isAdmin, userData, accessToken} = res.locals.auth;
  try {
    await axiosApi.updateArticle(Number(id), editArticle, accessToken);
    res.redirect(`/my`);
  } catch (err) {
    const categories = await axiosApi.getCategories({count: true});
    res.render(`pages/post-edit`, {
      isAuth,
      isAdmin,
      userData,
      articleId: id,
      editArticle,
      categories,
      message: getErrorMessage(err.response.data.message),
      csrfToken: req.csrfToken()
    });
  }
});

articlesRouter.get(`/:id`, csrfProtection, async (req, res) => {
  const {isAuth, isAdmin, userData} = res.locals.auth;

  try {
    const categories = await axiosApi.getCategories({count: true});
    const article = await axiosApi.getArticle({id: req.params.id, comments: true});

    return res.render(`pages/post`, {
      isAuth,
      isAdmin,
      userData,
      article,
      categories,
      message: {},
      csrfToken: req.csrfToken()
    });
  } catch (error) {
    return res
      .status(HttpCode.NOT_FOUND)
      .render(`errors/404`, {
        isAuth,
        isAdmin,
        userData
      });
  }
});

articlesRouter.post(`/:id`, [privateRoute, csrfProtection], async (req, res) => {
  const {id = ``} = req.params;
  const {isAuth, isAdmin, userData, accessToken} = res.locals.auth;

  try {
    const {text} = req.body;
    await axiosApi.createComment(id, {text}, accessToken);
    return res.redirect(`/articles/${id}`);
  } catch (err) {
    const categories = await axiosApi.getCategories({count: true});
    const article = await axiosApi.getArticle({id, comments: true});

    return res.render(`pages/post`, {
      isAuth,
      isAdmin,
      userData,
      article,
      categories,
      message: getErrorMessage(err.response.data.message),
      csrfToken: req.csrfToken()
    });
  }
});

module.exports = articlesRouter;
