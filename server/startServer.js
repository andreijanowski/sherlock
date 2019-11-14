/* eslint-disable no-console */
const https = require("https");
const fs = require("fs");

const port = process.env.PORT || 3000;

async function startServer(dev, server) {
  try {
    if (dev) {
      https
        .createServer(
          {
            key: fs.readFileSync("localhost-key.pem"),
            cert: fs.readFileSync("localhost.pem")
          },
          server
        )
        .listen(port);
      console.log(`> Ready on https://localhost:${port}`);
    } else {
      await server.listen(port);
      console.log(`> Ready on http://localhost:${port}`);
    }
  } catch (e) {
    console.log("server express error: ", e);
  }
}

module.exports = startServer;
