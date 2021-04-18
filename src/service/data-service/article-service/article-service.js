'use strict';

const Aliase = require(`../../models/aliase`);

class ArticleService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
    this._Category = sequelize.models.Category;
    this._ArticleCategory = sequelize.models.ArticleCategory;
    this._Comment = sequelize.models.Comment;
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

    await this._ArticleCategory.destroy({
      where: {ArticleId: id}
    });

    const updateArticle = await this._Article.findByPk(id);
    await updateArticle.addCategories([...article.categories]);
    return Boolean(updatedRows);
  }

  async findAll(hasComments) {
    const include = [Aliase.CATEGORIES];

    if (hasComments) {
      include.push({
        model: this._Comment,
        as: Aliase.COMMENTS,
        include: [Aliase.USERS]
      });
    }

    const articles = await this._Article.findAll({
      include,
      order: [
        [`createdAt`, `DESC`]
      ]
    });

    return {
      count: articles.length,
      articles: articles.map((item) => item.get())
    };
  }

  async findPage(limit, offset, hasComments) {
    const {count, rows} = await this._Article.findAndCountAll({
      limit,
      offset,
      include: hasComments ? [Aliase.CATEGORIES, Aliase.COMMENTS] : [Aliase.CATEGORIES],
      distinct: true,
      order: [
        [`createdAt`, `DESC`]
      ]
    });

    return {
      count,
      articles: rows
    };
  }

  async findInCategory(limit, offset, catId, hasComments) {
    const include = [{
      model: this._Category,
      as: Aliase.CATEGORIES,
      where: {
        id: catId
      }
    }];

    if (hasComments) {
      include.push(Aliase.COMMENTS);
    }

    if (limit || offset) {
      const {count, rows} = await this._Article.findAndCountAll({
        limit,
        offset,
        include,
        distinct: true
      });

      return {
        count,
        articles: rows
      };
    }

    const result = await this._Article.findAll({include});
    const articles = result.map((it) => it.get());

    return {
      count: articles.length,
      articles
    };
  }

  findOne(id, hasComments) {
    const include = [Aliase.CATEGORIES];

    if (hasComments) {
      include.push({
        model: this._Comment,
        as: Aliase.COMMENTS,
        include: [Aliase.USERS]
      });
    }

    return this._Article.findByPk(id, {include});
  }
}

module.exports = ArticleService;
