'use strict';

class CategoryService {
  constructor(posts) {
    this._posts = posts;
  }

  findAll() {
    const categories = new Set();
    this._posts.forEach((post) => {
      post.сategory.forEach((category) => {
        categories.add(category);
      });
    });
    return [...categories];
  }
}

module.exports = CategoryService;
