'use strict';

class CategoryService {
  constructor(posts) {
    this._posts = posts;
  }

  findAll() {
    const categories = new Set();
    this._posts.forEach((post) => {
      categories.add(...post.сategory);
    });
    return [...categories];
  }
}

module.exports = CategoryService;
