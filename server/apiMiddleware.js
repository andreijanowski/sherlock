const axiosClient = require("./utils/axiosClient");
const oauthClient = require("./utils/oauthClient");
const setAuthCookies = require("./utils/setAuthCookies");
const clearAuthCookies = require("./utils/clearAuthCookies");

let appAuth = {
  isAuthorized: false
};

const apiMiddleware = async (req, res, next) => {
  try {
    if (
      !appAuth.isAuthorized ||
      appAuth.createdAt * 1000 + appAuth.expiresIn * 1000 < Date.now()
    ) {
      const payload = await oauthClient({
        grantType: "client_credentials",
        scope: "public"
      });
      const { accessToken, expiresIn, createdAt } = payload.data;
      appAuth = { accessToken, expiresIn, createdAt, isAuthorized: true };
    }

    let refreshedAccessToken = null;

    if (req.cookies.isAuthenticated && !req.cookies.isAuthorized) {
      try {
        const payload = await oauthClient({
          grantType: "refresh_token",
          refreshToken: req.cookies.refreshToken
        });
        setAuthCookies(res, payload.data);
        refreshedAccessToken = payload.data.accessToken;
      } catch (e) {
        clearAuthCookies(res);
      }
    }

    const token =
      refreshedAccessToken || req.cookies.accessToken || appAuth.accessToken;

    const { url, method, body, query } = req;

    try {
      const payload = await axiosClient({
        method,
        url: `/api${url}`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: body,
        params: query
      });
      res.send(payload.data);
    } catch (e) {
      res.status(e.response.status);
      res.send(e.response.data);
    }
  } catch (e) {
    next();
  }
};

module.exports = apiMiddleware;
