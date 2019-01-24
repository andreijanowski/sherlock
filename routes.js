const routes = require("next-routes");
const { languagesPattern } = require("./consts");

module.exports = routes()
  .add("landing", `/:lng(${languagesPattern})/`)
  .add("login", `/:lng(${languagesPattern})/login/`)
  .add("register", `/:lng(${languagesPattern})/register/`)
  .add("add/manager", `/:lng(${languagesPattern})/add/manager/`)
  .add("add/venue", `/:lng(${languagesPattern})/add/venue/`)
  .add("app/index", `/:lng(${languagesPattern})/app/`)
  .add(
    "app/profile/basicInformation",
    `/:lng(${languagesPattern})/app/:slug/profile/basic-information/`
  )
  .add(
    "app/profile/members",
    `/:lng(${languagesPattern})/app/:slug/profile/members/`
  )
  .add(
    "app/profile/contactInformation",
    `/:lng(${languagesPattern})/app/:slug/profile/contact-information/`
  )
  .add(
    "app/profile/additionalInformation",
    `/:lng(${languagesPattern})/app/:slug/profile/additional-information/`
  )
  .add(
    "app/profile/openingHours",
    `/:lng(${languagesPattern})/app/:slug/profile/opening-hours/`
  )
  .add(
    "app/profile/picturesAndMenus",
    `/:lng(${languagesPattern})/app/:slug/profile/pictures-and-menus/`
  );
