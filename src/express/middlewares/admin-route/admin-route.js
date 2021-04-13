'use strict';

module.exports = (req, res, next) => {
  if (res.locals.auth.isAuth && res.locals.auth.isAdmin) {
    return next();
  }

  return res.redirect(`/`);
};
