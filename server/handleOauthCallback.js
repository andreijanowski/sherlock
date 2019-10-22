/* eslint-disable no-console */
const oauthClient = require("./utils/oauthClient");
const setAuthCookies = require("./utils/setAuthCookies");
const clearAuthCookies = require("./utils/clearAuthCookies");

function handleOauthCallback(req, res) {
  if (req.query.state === req.cookies.loginStateParam) {
    res.clearCookie("loginStateParam");
    oauthClient({
      grantType: "authorization_code",
      redirectUri: process.env.OAUTH_CALLBACK_URL,
      code: req.query.code
    })
      .then(payload => {
        setAuthCookies(res, payload.data);
        res.redirect("/");
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    res.clearCookie("loginStateParam");
    clearAuthCookies();
    res.redirect("/");
  }
}

module.exports = handleOauthCallback;
