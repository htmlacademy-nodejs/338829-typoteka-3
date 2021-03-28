'use strict';

const {HttpCode} = require(`../../../constants`);

module.exports = (commentService) => async (req, res, next) => {
  try {
    const {commentId} = req.params;

    const comment = await commentService.findOne(commentId);
    if (!comment) {
      return res
          .status(HttpCode.NOT_FOUND)
          .send(`Comment with ${commentId} not found `);
    }

    res.locals.comment = comment;
    return next();
  } catch (error) {
    return next(error);
  }
};
