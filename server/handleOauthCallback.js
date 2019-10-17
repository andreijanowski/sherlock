/* eslint-disable no-console */
const oauthClient = require("./utils/oauthClient");
const setAuthCookies = require("./utils/setAuthCookies");

function handleOauthCallback(req, res) {
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
}

module.exports = handleOauthCallback;
