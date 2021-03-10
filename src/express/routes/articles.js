'use strict';

const {Router} = require(`express`);
const {pictureUpload} = require(`../middlewares`);
const {HttpCode} = require(`../../constants`);
const {axiosApi} = require(`../axios-api/axios-api`);
const {getCategoryArticle, getPictureArticle, getErrorMessage} = require(`../../utils`);
const {LIMIT_PER_PAGE} = require(`../../constants`);

const articlesRouter = new Router();

articlesRouter.get(`/category/:id`, async (req, res) => {
  const catId = Number(req.params.id);
  const {page = 1} = req.query;

  const limit = LIMIT_PER_PAGE;
  const offset = (Number(page) - 1) * limit;

  const [categories, {count, articles}] = await Promise.all([
    axiosApi.getCategories({count: true}),
    axiosApi.getArticles({limit, offset, comments: true, catId})
  ]);

  const totalPages = Math.ceil(count / limit);

  res.render(`pages/articles-by-category`, {
    categories,
    catId,
    articles,
    totalPages,
    page: Number(page)
  });
});

articlesRouter.get(`/add`, async (req, res) => {
  const categories = await axiosApi.getCategories();
  res.render(`pages/new-post`, {
    newArticle: {
      categories: []
    },
    categories,
    message: {}
  });
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
    res.render(`pages/new-post`, {
      newArticle,
      categories,
      message: getErrorMessage(err.response.data.message)
    });
  }
});

articlesRouter.get(`/edit/:id`, async (req, res) => {
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

module.exports = articlesRouter;
