/* eslint-disable no-console */
const axiosClient = require("./axiosClient");

function handleOauth(server) {
  // oauth login middleware:
  // 1. handle oauth login callback url
  // 2. make a request for authorization credentials
  // 3. save those credentials as a safe http-only cookie
  // 4. redirect to homepage
  server.get("/oauth-callback", (req, res) => {
    const { code } = req.query;
    axiosClient({
      method: "post",
      url: "/oauth/token",
      data: {
        grantType: "authorization_code",
        clientId: process.env.OAUTH_PUBLIC_CLIENT_ID,
        clientSecret: process.env.OAUTH_SECRET_CLIENT_ID,
        redirectUri: process.env.OAUTH_CALLBACK_URL,
        code
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
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true
        });
        res.cookie("accessTokenExpiresIn", expiresIn);
        res.cookie("accessTokenCreatedAt", createdAt);
        res.cookie("isAuthenticated", true, { maxAge });
        res.redirect("/");
      })
      .catch(err => {
        console.log(err);
      });
  });
}

module.exports = handleOauth;
