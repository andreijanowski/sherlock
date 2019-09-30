/* eslint-disable no-console */
require("dotenv").config();
const express = require("express");
const next = require("next");
const nextI18NextMiddleware = require("next-i18next/middleware").default;
const cookieParser = require("cookie-parser");
const nextI18next = require("../i18n");
const routes = require("../routes");
const setCacheForStaticAssets = require("./setCacheForStaticAssets");
const handleOauthCallback = require("./handleOauthCallback");
const handleRefreshToken = require("./handleRefreshToken");
const apiMiddleware = require("./apiMiddleware");
const handleNextjs = require("./handleNextjs");
const startServer = require("./startServer");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = routes.getRequestHandler(app);

(async () => {
  try {
    await app.prepare();
  } catch (e) {
    console.log("server next error: ", e);
  }

  const server = express();
  server.use(cookieParser());
  server.use(nextI18NextMiddleware(nextI18next));
  setCacheForStaticAssets(dev, server);
  handleOauthCallback(server);
  handleRefreshToken(server);
  apiMiddleware(server);
  handleNextjs(handler, server);

  try {
    await startServer(dev, server);
  } catch (e) {
    console.log("server start error: ", e);
  }
})();
