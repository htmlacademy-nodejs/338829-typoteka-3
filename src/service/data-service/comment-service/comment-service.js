'use strict';

const {Aliase} = require(`../../models`);

class CommentService {
  constructor(sequelize) {
    this._Comment = sequelize.models.Comment;
  }

  create(articleId, comment) {
    return this._Comment.create({
      articleId,
      ...comment
    });
  }

  delete(commentId) {
    const deletedRows = this._Comment.destroy({
      where: {id: commentId}
    });
    return Boolean(deletedRows);
  }

  findAll(articleId) {
    return this._Comment.findAll({
      where: {articleId},
      raw: true
    });
  }

  findOne(commentId) {
    return this._Comment.findByPk(commentId);
  }

  async findLast() {
    const comments = await this._Comment.findAll({
      include: [Aliase.USERS],
      order: [
        [`createdAt`, `DESC`]
      ]
    });

    return comments.map((item) => item.get());
  }
}

module.exports = CommentService;
