/* eslint-disable no-console */
const uuid = require("uuid");

function handleOauthCallback(req, res) {
  const { plan } = req.query;
  const state = uuid();
  res.cookie("loginStateParam", state);
  if (plan) {
    res.cookie("chosenPlan", plan);
  }
  res.redirect(
    301,
    `${process.env.PUBLIC_API_URL}/oauth/authorize?client_id=${
      process.env.OAUTH_PUBLIC_CLIENT_ID
    }&redirect_uri=${
      process.env.OAUTH_CALLBACK_URL
    }&response_type=code&scope=trusted+refresh_token+public&state=${state}`
  );
}

module.exports = handleOauthCallback;
