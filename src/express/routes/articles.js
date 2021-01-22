'use strict';

const {Router} = require(`express`);
const {pictureUpload} = require(`../middlewares`);
const {HttpCode} = require(`../../constants`);
const {axiosApi} = require(`../axios-api/axios-api`);
const articlesRouter = new Router();

articlesRouter.get(`/category/:id`, (req, res) => res.render(`pages/articles-by-category`));

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
    createdDate: body.date,
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
    const article = await axiosApi.getArticle(req.params.id);
    res.render(`pages/post`, {article});
  } catch (error) {
    res
      .status(HttpCode.NOT_FOUND)
      .render(`errors/404`);
  }
});

module.exports = articlesRouter;
