'use strict';

const {QueryTypes} = require(`sequelize`);

class CategoryService {
  constructor(sequelize) {
    this._sequelize = sequelize;
    this._Category = sequelize.models.Category;
  }

  async findAll(hasCount) {
    if (hasCount) {
      const query = `
        SELECT "Category"."name", "Category"."id", count("articleCategories"."CategoryId") AS "count"
        FROM "categories" AS "Category"
        LEFT OUTER JOIN "articleCategories" AS "articleCategories" ON "Category"."id" = "articleCategories"."CategoryId"
        GROUP BY "Category"."id";
      `;

      const result = await this._sequelize.query(query, {type: QueryTypes.SELECT});
      return result;
    }

    return this._Category.findAll({raw: true});
  }
}

module.exports = CategoryService;
