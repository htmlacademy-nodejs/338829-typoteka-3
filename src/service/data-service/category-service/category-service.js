'use strict';

class CategoryService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    const categories = new Set();
    this._articles.forEach((article) => {
      article.category.forEach((category) => {
        categories.add(category);
      });
    });
    return [...categories];
  }
}

module.exports = CategoryService;
