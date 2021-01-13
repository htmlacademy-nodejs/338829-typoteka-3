'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../../constants`);

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  create(article) {
    const newArticle = {
      ...article,
      id: nanoid(MAX_ID_LENGTH),
      comments: []
    };

    this._articles.push(newArticle);
    return newArticle;
  }

  delete(id) {
    const article = this.findOne(id);
    if (!article) {
      return null;
    }

    this._articles = this._articles.filter((item) => item.id !== id);
    return article;
  }

  update(id, article) {
    const oldArticle = this.findOne(id);

    const updateArticle = {
      ...oldArticle,
      ...article
    };

    this._articles = this._articles.map((item) => {
      if (item.id === id) {
        return updateArticle;
      }

      return item;
    });

    return updateArticle;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((article) => article.id === id);
  }
}

module.exports = ArticleService;
