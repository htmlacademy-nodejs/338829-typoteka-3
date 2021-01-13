'use strict';

class SearchService {
  constructor(posts) {
    this._posts = posts;
  }

  filter(queryValue) {
    const pattern = new RegExp(queryValue, `gi`);
    return this._posts.filter((post) => post.title.match(pattern));
  }
}

module.exports = SearchService;
