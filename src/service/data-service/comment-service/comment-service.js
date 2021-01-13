'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../../constants`);

class CommentService {
  create(article, comment) {
    const newComment = {
      ...comment,
      id: nanoid(MAX_ID_LENGTH)
    };

    article.comments.push(newComment);
    return newComment;
  }

  delete(article, commentId) {
    const comment = this.findOne(article, commentId);
    if (!comment) {
      return null;
    }

    article.comments = article.comments.filter((item) => item.id !== commentId);
    return comment;
  }

  findAll(article) {
    return article.comments;
  }

  findOne(article, commentId) {
    return article.comments.find((comment) => comment.id === commentId);
  }
}

module.exports = CommentService;
