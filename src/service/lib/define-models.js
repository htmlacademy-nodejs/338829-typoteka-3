'use strict';

const {
  Aliase,
  defineCategory,
  defineComment,
  defineArticle,
  defineArticleCategory,
  defineUser,
  defineToken
} = require(`../models`);

module.exports = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Article = defineArticle(sequelize);
  const ArticleCategory = defineArticleCategory(sequelize);
  const User = defineUser(sequelize);
  const Token = defineToken(sequelize);

  // один ко многим
  // связка статья -> комментарий
  Article.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `articleId`});
  Comment.belongsTo(Article, {foreignKey: `articleId`});

  // многие ко многим
  // связка статья -> категории
  Article.belongsToMany(Category, {through: ArticleCategory, as: Aliase.CATEGORIES});
  Category.belongsToMany(Article, {through: ArticleCategory, as: Aliase.ARTICLES});
  Category.hasMany(ArticleCategory, {as: Aliase.ARTICLE_CATEGORIES});

  // связка пользователь -> комментарий
  User.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `userId`});
  Comment.belongsTo(User, {as: Aliase.USERS, foreignKey: `userId`});

  return {
    Category,
    Comment,
    Article,
    ArticleCategory,
    User,
    Token
  };
};
