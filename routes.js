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
    `/:lng(${languagesPattern})/app/profile/basic-information/`
  )
  .add("app/profile/members", `/:lng(${languagesPattern})/app/profile/members/`)
  .add(
    "app/profile/contactInformation",
    `/:lng(${languagesPattern})/app/profile/contact-information/`
  )
  .add(
    "app/profile/additionalInformation",
    `/:lng(${languagesPattern})/app/profile/additional-information/`
  )
  .add(
    "app/profile/openingHours",
    `/:lng(${languagesPattern})/app/profile/opening-hours/`
  )
  .add(
    "app/profile/picturesAndMenus",
    `/:lng(${languagesPattern})/app/profile/pictures-and-menus/`
  )
  .add(
    "app/settings/basicInformation",
    `/:lng(${languagesPattern})/app/settings/basic-information/`
  )
  .add(
    "app/settings/billing",
    `/:lng(${languagesPattern})/app/settings/billing/`
  )
  .add(
    "app/settings/password",
    `/:lng(${languagesPattern})/app/settings/password/`
  );
