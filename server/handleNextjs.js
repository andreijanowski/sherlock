const { resetServerContext } = require("react-beautiful-dnd");

function handleNextjs(handler, server) {
  server.get(/^((?!^\/locales\/).)*$/, (req, res) => {
    resetServerContext();
    return handler(req, res);
  });
}

module.exports = handleNextjs;
