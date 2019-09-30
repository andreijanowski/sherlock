function setCacheForStaticAssets(dev, server) {
  if (!dev) {
    server.get(
      /^\/_next\/static\/(emoji|favicon|flags|fonts|img)\//,
      (_, res, nextHandler) => {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        nextHandler();
      }
    );
  }
}

module.exports = setCacheForStaticAssets;
