'use strict';

const bcrypt = require(`bcrypt`);
const {Aliase} = require(`../models`);
const defineModels = require(`./define-models`);
const {BCRYPT_SALT_ROUNDS} = require(`../../constants`);

module.exports = async (sequelize, {categories, articles, users = []}) => {
  const {Category, Article, User, Comment} = defineModels(sequelize);
  await sequelize.sync({force: true});

  const categoryModels = await Category.bulkCreate(categories.map((item) => ({name: item})));

  const categoryIdByName = categoryModels.reduce((acc, next) => ({
    [next.name]: next.id,
    ...acc
  }), {});

  const articlePromises = articles.map(async (article) => {
    const articleModel = await Article.create(article, {
      include: [{
        model: Comment,
        as: Aliase.COMMENTS,
        include: [Aliase.USERS]
      }]
    });

    await articleModel.addCategories(
        article.categories.map((name) => categoryIdByName[name])
    );
  });

  if (users.length) {
    const promises = users.map(async (user) => {
      const pwHash = await bcrypt.hash(user.password, BCRYPT_SALT_ROUNDS);
      return {...user, password: pwHash};
    });

    const usersBcrypt = await Promise.all(promises);
    await User.bulkCreate(usersBcrypt);
  }

  await Promise.all(articlePromises);
};
