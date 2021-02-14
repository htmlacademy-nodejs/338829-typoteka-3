'use strict';

const Aliase = require(`./aliase`);
const defineCategory = require(`./category/category`);
const defineComment = require(`./comment/comment`);
const defineArticle = require(`./article/article`);
const defineArticleCategory = require(`./article-category/article-category`);

module.exports = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Article = defineArticle(sequelize);
  const ArticleCategory = defineArticleCategory(sequelize);

  // один ко многим
  // связка статья -> коммент
  Article.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `articleId`});
  Comment.belongsTo(Article, {foreignKey: `articleId`});

  // многие ко многим
  // связка статья -> категории
  Article.belongsToMany(Category, {through: ArticleCategory, as: Aliase.CATEGORIES});
  Category.belongsToMany(Article, {through: ArticleCategory, as: Aliase.ARTICLES});
  Category.hasMany(ArticleCategory, {as: Aliase.ARTICLE_CATEGORIES});

  return {
    Category,
    Comment,
    Article,
    ArticleCategory
  };
};