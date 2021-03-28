'use strict';

const express = require(`express`);
const {pictureUpload} = require(`../middlewares`);
const {HttpCode} = require(`../../constants`);
const {axiosApi} = require(`../axios-api/axios-api`);
const {getCategoryArticle, getPictureArticle, getErrorMessage} = require(`../../utils`);
const {LIMIT_PER_PAGE} = require(`../../constants`);

const articlesRouter = new express.Router();
articlesRouter.use(express.urlencoded({extended: true}));

articlesRouter.get(`/category/:id`, async (req, res, next) => {
  try {
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

articlesRouter.get(`/add`, async (req, res, next) => {
  try {
    const categories = await axiosApi.getCategories();
    res.render(`pages/post-new`, {
      newArticle: {
        categories: []
      },
      categories,
      message: {}
    });
  } catch (error) {
    return next(error);
  }
});

articlesRouter.post(`/add`, pictureUpload.single(`img`), async (req, res) => {
  const {body, file} = req;

  const newArticle = {
    title: body.title,
    picture: getPictureArticle(file, body),
    announce: body.announce,
    fullText: body.fullText,
    createdAt: body.date,
    categories: getCategoryArticle(body.categories)
  };

  try {
    await axiosApi.createArticle(newArticle);
    res.redirect(`/my`);
  } catch (err) {
    const categories = await axiosApi.getCategories();
    res.render(`pages/post-new`, {
      newArticle,
      categories,
      message: getErrorMessage(err.response.data.message)
    });
  }
});

articlesRouter.get(`/edit/:id`, async (req, res) => {
  try {
    const {id} = req.params;
    const categories = await axiosApi.getCategories({count: true});
    const editArticle = await axiosApi.getArticle({id});

    res.render(`pages/post-edit`, {
      articleId: id,
      editArticle: {
        ...editArticle,
        categories: editArticle.categories.map((cat) => String(cat.id))
      },
      categories,
      message: {}
    });
  } catch (error) {
    res
      .status(HttpCode.NOT_FOUND)
      .render(`errors/404`);
  }
});

articlesRouter.post(`/edit/:id`, pictureUpload.single(`img`), async (req, res) => {
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

  try {
    await axiosApi.updateArticle(Number(id), editArticle);
    res.redirect(`/my`);
  } catch (err) {
    const categories = await axiosApi.getCategories({count: true});
    res.render(`pages/post-edit`, {
      articleId: id,
      editArticle,
      categories,
      message: getErrorMessage(err.response.data.message)
    });
  }
});

articlesRouter.get(`/:id`, async (req, res) => {
  try {
    const categories = await axiosApi.getCategories({count: true});
    const article = await axiosApi.getArticle({id: req.params.id, comments: true});

    res.render(`pages/post`, {
      article,
      categories,
      message: {}
    });
  } catch (error) {
    res
      .status(HttpCode.NOT_FOUND)
      .render(`errors/404`);
  }
});

articlesRouter.post(`/:id`, async (req, res) => {
  const {id = ``} = req.params;

  try {
    const {text} = req.body;
    await axiosApi.createComment(id, {text});
    res.redirect(`/articles/${id}`);
  } catch (err) {
    const categories = await axiosApi.getCategories({count: true});
    const article = await axiosApi.getArticle({id, comments: true});
    res.render(`pages/post`, {
      article,
      categories,
      message: getErrorMessage(err.response.data.message)
    });
  }
});

module.exports = articlesRouter;
