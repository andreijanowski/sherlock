/* eslint-disable no-console */
const oauthClient = require("./utils/oauthClient");
const setAuthCookies = require("./utils/setAuthCookies");
const clearAuthCookies = require("./utils/clearAuthCookies");

function handleOauthCallback(req, res) {
  if (req.query.state === req.cookies.loginStateParam) {
    let redirectTo = "/";
    if (req.cookies.chosenPlan === "basic") {
      redirectTo = "/app/subscriptions";
      res.clearCookie("chosenPlan");
    } else if (req.cookies.chosenPlan === "essential") {
      redirectTo = "/referrals";
      res.clearCookie("chosenPlan");
    }
    res.clearCookie("loginStateParam");
    oauthClient({
      grantType: "authorization_code",
      redirectUri: process.env.OAUTH_CALLBACK_URL,
      code: req.query.code
    })
      .then(payload => {
        setAuthCookies(res, payload.data);
        res.redirect(redirectTo);
      })
      .catch(err => {
        res.status(err.response.status);
        res.redirect("/");
      });
  } else {
    res.clearCookie("loginStateParam");
    clearAuthCookies(res);
    res.redirect("/");
  }
}

module.exports = handleOauthCallback;
