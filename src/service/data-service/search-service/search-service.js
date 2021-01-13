'use strict';

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  filter(queryValue) {
    const pattern = new RegExp(queryValue, `gi`);
    return this._articles.filter((article) => article.title.match(pattern));
  }
}

module.exports = SearchService;
