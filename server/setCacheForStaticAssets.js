/* eslint-disable func-names */

function setCacheForStaticAssets(dev) {
  return function(_, res, next) {
    if (!dev) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      next();
    }
  };
}

module.exports = setCacheForStaticAssets;
