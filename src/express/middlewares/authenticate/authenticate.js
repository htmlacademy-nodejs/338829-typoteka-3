'use strict';

module.exports = (req, res, next) => {
  const {_ac: accessToken, _rf: refreshToken} = req.cookies;
  const isAuth = Boolean(accessToken) && Boolean(refreshToken);
  const isAdmin = false; // fake

  res.locals.auth = {isAuth, isAdmin, accessToken, refreshToken};
  return next();
};
