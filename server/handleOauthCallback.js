/* eslint-disable no-console */
const oauthClient = require("./utils/oauthClient");
const setAuthCookies = require("./utils/setAuthCookies");
const clearAuthCookies = require("./utils/clearAuthCookies");

function handleOauthCallback(req, res) {
  let registrationCallback = false;
  let lang = "en";
  let { state } = req.query;

  if (
    typeof state !== "undefined" &&
    state.slice(0, -2).endsWith("registration")
  ) {
    lang = state.slice(-2);
    state = state.substring(0, state.length - 14);
    registrationCallback = true;
    req.cookies["next-i18next"] = lang;
  }

  if (state === req.cookies.loginStateParam) {
    let redirectTo = "/";
    if (registrationCallback) {
      redirectTo = `/${req.cookies["next-i18next"]}/sign-up-confirmation`;
    } else if (req.cookies.chosenPlan === "basic") {
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
        res.status(err.response ? err.response.status : 500);
        console.log(err);
        res.redirect("/");
      });
  } else {
    res.clearCookie("loginStateParam");
    clearAuthCookies(res);
    res.redirect("/");
  }
}

module.exports = handleOauthCallback;
