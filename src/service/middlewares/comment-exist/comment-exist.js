'use strict';

const {HttpCode} = require(`../../../constants`);

module.exports = (commentService) => (req, res, next) => {
  const {commentId} = req.params;
  const {article} = res.locals;
  const comment = commentService.findOne(article, commentId);

  if (!comment) {
    return res
        .status(HttpCode.NOT_FOUND)
        .send(`Comment with ${commentId} not found `);
  }

  res.locals.comment = comment;
  return next();
};
