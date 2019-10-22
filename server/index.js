/* eslint-disable no-console */
require("dotenv").config();
const express = require("express");
const next = require("next");
const nextI18NextMiddleware = require("next-i18next/middleware").default;
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const nextI18next = require("../i18n");
const routes = require("../routes");
const setCacheForStaticAssets = require("./setCacheForStaticAssets");
const handleOauthCallback = require("./handleOauthCallback");
const handleTokenRefresh = require("./handleTokenRefresh");
const apiMiddleware = require("./apiMiddleware");
const handleNextjs = require("./handleNextjs");
const startServer = require("./startServer");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = routes.getRequestHandler(app);
const apiParser = bodyParser.json({ type: "application/vnd.api+json" });
const pusherParser = bodyParser.urlencoded({
  extended: true,
  type: "application/x-www-form-urlencoded"
});

(async () => {
  try {
    await app.prepare();
  } catch (e) {
    console.log("server next error: ", e);
  }

  const server = express();
  server.use(cookieParser());
  server.use(nextI18NextMiddleware(nextI18next));
  server.get(
    /^\/_next\/static\/(emoji|favicon|flags|fonts|img)\//,
    setCacheForStaticAssets(dev)
  );
  server.get("/oauth-callback", handleOauthCallback);
  server.post("/refresh-token", handleTokenRefresh);
  server.use(pusherParser);
  server.use("/api", apiParser, apiMiddleware);
  handleNextjs(handler, server);

  try {
    await startServer(dev, server);
  } catch (e) {
    console.log("server start error: ", e);
  }
})();
