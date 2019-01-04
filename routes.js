const routes = require("next-routes");
const { languagesPattern } = require("./consts");

module.exports = routes()
  .add("landing", `/:lng(${languagesPattern})/`)
  .add("register", `/:lng(${languagesPattern})/register`)
  .add("add/manager", `/:lng(${languagesPattern})/add/manager`);
