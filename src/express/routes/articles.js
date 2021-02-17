'use strict';

const {Router} = require(`express`);
const {pictureUpload} = require(`../middlewares`);
const {HttpCode} = require(`../../constants`);
const {axiosApi} = require(`../axios-api/axios-api`);
const articlesRouter = new Router();

articlesRouter.get(`/category/:id`, async (req, res) => {
  const hasCount = true;
  const categories = await axiosApi.getCategories(hasCount);

  res.render(`pages/articles-by-category`, {categories, currentId: Number(req.params.id)});
});

articlesRouter.get(`/add`, (req, res) => {
  res.render(`pages/new-post`, {newArticle: {}});
});

articlesRouter.post(`/add`, pictureUpload.single(`img`), async (req, res) => {
  const {body, file} = req;

  const newArticle = {
    title: body.title,
    picture: file && file.filename || ``,
    announce: body.announce,
    fullText: body.fullText,
    createdAt: body.date,
    category: []
  };

  try {
    await axiosApi.createArticle(newArticle);
    res.redirect(`/my`);
  } catch (e) {
    res.render(`pages/new-post`, {newArticle});
  }
});

articlesRouter.get(`/edit/:id`, async (req, res) => {
  try {
    const article = await axiosApi.getArticle(req.params.id);
    res.render(`pages/post`, {article});
  } catch (error) {
    res
      .status(HttpCode.NOT_FOUND)
      .render(`errors/404`);
  }
});

articlesRouter.get(`/:id`, async (req, res) => {
  try {
    const hasComments = true;
    const article = await axiosApi.getArticle(req.params.id, hasComments);

    res.render(`pages/post`, {article});
  } catch (error) {
    res
      .status(HttpCode.NOT_FOUND)
      .render(`errors/404`);
  }
});

module.exports = articlesRouter;
