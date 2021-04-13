'use strict';
const csrf = require(`csurf`);

const pictureUpload = require(`./picture-upload/picture-upload`);
const authenticate = require(`./authenticate/authenticate`);
const privateRoute = require(`./private-route/private-route`);
const adminRoute = require(`./admin-route/admin-route`);

module.exports = {
  pictureUpload,
  authenticate,
  privateRoute,
  adminRoute,
  csrfProtection: csrf({cookie: true})
};
