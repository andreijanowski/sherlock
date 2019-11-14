/* eslint-disable no-console */
const clearAuthCookies = require("./utils/clearAuthCookies");

function handleUserLogout(req, res) {
  clearAuthCookies(res);
  res.redirect(req.query.origin_url);
}

module.exports = handleUserLogout;
