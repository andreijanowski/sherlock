const axiosClient = require("./axiosClient");

const pendingRefreshingTokens = [];

function handleRefresh(server) {
  // oauth refresh token middleware:
  // eslint-disable-next-line consistent-return
  server.use("/refresh-token", (req, res) => {
    if (pendingRefreshingTokens.includes(req.cookies.refreshToken)) {
      res.type("application/json");
      return res.send({ message: "token refreshing is pending" });
    }
    pendingRefreshingTokens.push(req.cookies.refreshToken);
    axiosClient({
      method: "post",
      url: "/oauth/token",
      data: {
        grantType: "refresh_token",
        clientId: process.env.OAUTH_PUBLIC_CLIENT_ID,
        clientSecret: process.env.OAUTH_SECRET_CLIENT_ID,
        refreshToken: req.cookies.refreshToken
      }
    })
      .then(payload => {
        const {
          accessToken,
          expiresIn,
          createdAt,
          refreshToken
        } = payload.data;
        const maxAge =
          Number(expiresIn) * 1000 + Number(createdAt) * 1000 - Date.now();
        res.cookie("accessToken", accessToken, { httpOnly: true });
        res.cookie("refreshToken", refreshToken, { httpOnly: true });
        res.cookie("accessTokenExpiresIn", expiresIn);
        res.cookie("accessTokenCreatedAt", createdAt);
        res.cookie("isAuthenticated", true, { maxAge });
        res.type("application/json");
        res.send();
        const index = pendingRefreshingTokens.indexOf(req.cookies.refreshToken);
        if (index !== -1) pendingRefreshingTokens.splice(index, 1);
      })
      .catch(err => {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.clearCookie("accessTokenExpiresIn");
        res.clearCookie("accessTokenCreatedAt");
        res.clearCookie("isAuthenticated");
        res.status(err.response.status);
        res.send(err.response.data);
      });
  });
}

module.exports = handleRefresh;
