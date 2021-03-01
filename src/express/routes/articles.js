'use strict';

const {Router} = require(`express`);
const {pictureUpload} = require(`../middlewares`);
const {HttpCode} = require(`../../constants`);
const {axiosApi} = require(`../axios-api/axios-api`);
const {getCategoryArticle} = require(`../../utils`);

const articlesRouter = new Router();

articlesRouter.get(`/category/:id`, async (req, res) => {
  const [categories, articles] = await Promise.all([
    axiosApi.getCategories({count: true}),
    axiosApi.getArticles({comments: true})
  ]);

  const catId = Number(req.params.id);

  res.render(`pages/articles-by-category`, {
    categories,
    catId,
    articles: articles.filter((article) => {
      return article.categories.some((category) => category.id === catId);
    })
  });
});

articlesRouter.get(`/add`, async (req, res) => {
  const categories = await axiosApi.getCategories();
  res.render(`pages/new-post`, {newArticle: {categories: []}, categories});
});

articlesRouter.post(`/add`, pictureUpload.single(`img`), async (req, res) => {
  const {body, file} = req;

  const newArticle = {
    title: body.title,
    picture: file && file.filename || ``,
    announce: body.announce,
    fullText: body.fullText,
    createdAt: body.date,
    categories: getCategoryArticle(body.categories)
  };

  const categories = await axiosApi.getCategories();

  try {
    await axiosApi.createArticle(newArticle);
    res.redirect(`/my`);
  } catch (e) {
    res.render(`pages/new-post`, {newArticle, categories});
  }
});

articlesRouter.get(`/edit/:id`, async (req, res) => {
  try {
    const article = await axiosApi.getArticle({id: req.params.id});
    res.render(`pages/post`, {article});
  } catch (error) {
    res
      .status(HttpCode.NOT_FOUND)
      .render(`errors/404`);
  }
});

articlesRouter.get(`/:id`, async (req, res) => {
  try {
    const article = await axiosApi.getArticle({id: req.params.id, comments: true});

    res.render(`pages/post`, {article});
  } catch (error) {
    res
      .status(HttpCode.NOT_FOUND)
      .render(`errors/404`);
  }
});

module.exports = articlesRouter;
