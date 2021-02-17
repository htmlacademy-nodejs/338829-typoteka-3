'use strict';

const Aliase = require(`../../models/aliase`);

class ArticleService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
  }

  async create(newArticle) {
    const article = await this._Article.create(newArticle);
    await article.addCategories(newArticle.categories);
    return article.get();
  }

  async delete(id) {
    const deletedRows = await this._Article.destroy({
      where: {id}
    });
    return Boolean(deletedRows);
  }

  async update(id, article) {
    const [updatedRows] = await this._Article.update(article, {
      where: {id}
    });
    return Boolean(updatedRows);
  }

  async findAll(hasComments) {
    const articles = await this._Article.findAll({
      include: hasComments ? [Aliase.CATEGORIES, Aliase.COMMENTS] : [Aliase.CATEGORIES]
    });
    return articles.map((item) => item.get());
  }

  findOne(id, hasComments) {
    return this._Article.findByPk(id, {include: hasComments ? [Aliase.CATEGORIES, Aliase.COMMENTS] : [Aliase.CATEGORIES]});
  }
}

module.exports = ArticleService;
