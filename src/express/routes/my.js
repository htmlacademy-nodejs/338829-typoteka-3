'use strict';

const {Router} = require(`express`);
const {axiosApi} = require(`../axios-api/axios-api`);
const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  const articles = await axiosApi.getArticles();
  return res.render(`pages/my`, {articles});
});

myRouter.get(`/comments`, async (req, res) => {
  const allArticles = await axiosApi.getArticles();
  const articles = allArticles.slice(0, 3);

  const response = await Promise.all(articles.map((article) => axiosApi.getArticleComments(article.id)));
  const comments = [];

  articles.forEach((article, index) => {
    response[index].forEach((comment) => {
      comments.push({
        articleId: article.id,
        articleTitle: article.title,
        createdDate: article.createdDate,
        author: `Александр Петров`,
        ...comment
      });
    });
  });

  return res.render(`pages/comments`, {comments});
});

module.exports = myRouter;
