'use strict';
const jwt = require(`jsonwebtoken`);
const {axiosApi} = require(`../../axios-api/axios-api`);
const {JWT_ACCESS_SECRET} = require(`../../../constants`);

module.exports = async (req, res, next) => {
  let {_ac: accessToken, _rf: refreshToken} = req.cookies;

  const verifySuccess = (data, acToken, refToken) => {
    return {
      isAuth: true,
      isAdmin: data.id === 1,
      userData: data,
      accessToken: acToken,
      refreshToken: refToken
    };
  };

  const verifyFail = () => {
    return {
      isAuth: false,
      isAdmin: false,
      userData: {},
      accessToken: ``,
      refreshToken: ``
    };
  };

  if (accessToken && refreshToken) {
    return jwt.verify(accessToken, JWT_ACCESS_SECRET, async (err, data) => {
      if (err) {
        try {
          const {accessToken: acToken, refreshToken: refToken} = await axiosApi.refresh(refreshToken);
          const decodeData = jwt.decode(acToken);

          res.locals.auth = verifySuccess(decodeData, acToken, refToken);
          res.cookie(`_ac`, acToken);
          res.cookie(`_rf`, refToken);
        } catch (error) {
          res.locals.auth = verifyFail();
          res.clearCookie(`_ac`);
          res.clearCookie(`_rf`);
        }
      } else {
        res.locals.auth = verifySuccess(data, accessToken, refreshToken);
      }

      return next();
    });
  }

  res.locals.auth = verifyFail();
  res.clearCookie(`_ac`);
  res.clearCookie(`_rf`);
  return next();
};
