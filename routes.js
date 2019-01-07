const routes = require("next-routes");
const { languagesPattern } = require("./consts");

module.exports = routes().add("landing", `/:lng(${languagesPattern})/`);
