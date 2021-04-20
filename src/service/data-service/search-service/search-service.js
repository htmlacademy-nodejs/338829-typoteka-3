'use strict';

const {Op} = require(`sequelize`);
const {Aliase} = require(`../../models`);

class SearchService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
  }

  async findAll(queryValue) {
    const articles = await this._Article.findAll({
      where: {
        title: {
          [Op.substring]: queryValue
        }
      },
      include: [Aliase.CATEGORIES],
      order: [
        [`createdAt`, `DESC`]
      ]
    });
    return articles.map((article) => article.get());
  }
}

module.exports = SearchService;
