const axiosClient = require("./utils/axiosClient");
const oauthClient = require("./utils/oauthClient");

let appAuth = {
  isAuthorized: false
};

let isAppTokenRefreshing = false;

const delay = ms => new Promise(res => setTimeout(res, ms));

function waitForToken() {
  delay(1000);
  if (isAppTokenRefreshing) {
    waitForToken();
  }
}

const apiMiddleware = async (req, res, next) => {
  try {
    if (
      !appAuth.isAuthorized ||
      appAuth.createdAt * 1000 + appAuth.expiresIn * 1000 < Date.now()
    ) {
      if (!isAppTokenRefreshing) {
        isAppTokenRefreshing = true;
        const payload = await oauthClient({
          grantType: "client_credentials",
          scope: "public"
        });
        const { accessToken, expiresIn, createdAt } = payload.data;
        appAuth = { accessToken, expiresIn, createdAt, isAuthorized: true };
        isAppTokenRefreshing = false;
      } else {
        waitForToken();
      }
    }

    const token = req.cookies.accessToken || appAuth.accessToken;

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
      res.status(payload.status);
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
