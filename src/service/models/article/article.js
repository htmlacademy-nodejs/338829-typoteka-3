'use strict';

const {DataTypes, Model} = require(`sequelize`);
const Aliase = require(`../aliase`);

class Article extends Model { }

module.exports = (sequelize) => {
  return Article.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    announce: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fullText: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: `Article`,
    tableName: Aliase.ARTICLES
  });
};
