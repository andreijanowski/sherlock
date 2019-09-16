/* eslint-disable no-console */
const express = require("express");
const path = require("path");
const next = require("next");
const nextI18NextMiddleware = require("next-i18next/middleware");
const { resetServerContext } = require("react-beautiful-dnd");
const nextI18next = require("./i18n");
const routes = require("./routes");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = routes.getRequestHandler(app);

const port = process.env.PORT || 3000;

(async () => {
  try {
    await app.prepare();
  } catch (e) {
    console.log("server next error: ", e);
  }

  const server = express();
  server.use(nextI18NextMiddleware(nextI18next));

  // serve locales for client
  server.use("/locales", express.static(path.join(__dirname, "/locales")));

  // use next.js
  server.get(/^((?!^\/locales\/).)*$/, (req, res) => {
    const host = req.header("host");

    if (
      host &&
      host.match(/^sherlock.foodetective.co|^www.sherlock.foodetective.co/i)
    ) {
      res.redirect(301, `https://business.foodetective.co${req.url}`);
      next();
    }

    resetServerContext();
    return handler(req, res);
  });

  try {
    await server.listen(port);
  } catch (e) {
    console.log("server express error: ", e);
  }

  console.log("> Ready on http://localhost:3000");
})();
