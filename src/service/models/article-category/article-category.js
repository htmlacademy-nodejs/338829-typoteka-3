'use strict';

const {Model} = require(`sequelize`);
const Aliase = require(`../aliase`);

class ArticleCategory extends Model { }

module.exports = (sequelize) => {
  return ArticleCategory.init({}, {
    sequelize,
    tableName: Aliase.ARTICLE_CATEGORIES
  });
};
