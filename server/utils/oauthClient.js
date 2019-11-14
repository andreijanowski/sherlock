const axiosClient = require("./axiosClient");

const oauthClient = data =>
  axiosClient({
    method: "post",
    url: "/oauth/token",
    data: {
      clientId: process.env.OAUTH_PUBLIC_CLIENT_ID,
      clientSecret: process.env.OAUTH_SECRET_CLIENT_ID,
      ...data
    }
  });

module.exports = oauthClient;
