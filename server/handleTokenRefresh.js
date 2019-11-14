const oauthClient = require("./utils/oauthClient");
const setAuthCookies = require("./utils/setAuthCookies");
const clearAuthCookies = require("./utils/clearAuthCookies");

const handleTokenRefresh = async (req, res) => {
  try {
    const payload = await oauthClient({
      grantType: "refresh_token",
      refreshToken: req.cookies.refreshToken
    });
    setAuthCookies(res, payload.data);
    res.status(200);
    res.send();
  } catch (e) {
    clearAuthCookies(res);
    res.status(e.response.status);
    res.send(e.response.data);
  }
};

module.exports = handleTokenRefresh;
