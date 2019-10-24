const { resetServerContext } = require("react-beautiful-dnd");

function handleNextjs(handler, server) {
  server.get(/^((?!^\/locales\/).)*$/, (req, res, next) => {
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
}

module.exports = handleNextjs;
