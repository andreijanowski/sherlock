const routes = require("next-routes");
const { languagesPattern } = require("./consts");

module.exports = routes()
  .add("landing", `/:lng(${languagesPattern})`)
  .add("login", `/:lng(${languagesPattern})/login`)
  .add("register", `/:lng(${languagesPattern})/register`)
  .add("confirm", `/:lng(${languagesPattern})/confirm/:token`)
  .add("resetPassword", `/:lng(${languagesPattern})/reset-password`)
  .add("changePassword", `/:lng(${languagesPattern})/change-password/:token`)
  .add("add/manager", `/:lng(${languagesPattern})/add/manager`)
  .add("add/venue", `/:lng(${languagesPattern})/add/venue`)
  .add("app/index", `/:lng(${languagesPattern})/app`)
  .add(
    "app/profile/basicInformation",
    `/:lng(${languagesPattern})/app/profile/basic-information`
  )
  .add("app/profile/members", `/:lng(${languagesPattern})/app/profile/members`)
  .add(
    "app/profile/contactInformation",
    `/:lng(${languagesPattern})/app/profile/contact-information`
  )
  .add(
    "app/profile/additionalInformation",
    `/:lng(${languagesPattern})/app/profile/additional-information`
  )
  .add(
    "app/profile/openingHours",
    `/:lng(${languagesPattern})/app/profile/opening-hours`
  )
  .add(
    "app/profile/picturesAndMenus",
    `/:lng(${languagesPattern})/app/profile/pictures-and-menus`
  )
  .add(
    "app/settings/basicInformation",
    `/:lng(${languagesPattern})/app/settings/basic-information`
  )
  .add(
    "app/settings/billing",
    `/:lng(${languagesPattern})/app/settings/billing`
  )
  .add(
    "app/settings/password",
    `/:lng(${languagesPattern})/app/settings/password`
  )
  .add("app/catering/day", `/:lng(${languagesPattern})/app/catering/day`)
  .add("app/catering/week", `/:lng(${languagesPattern})/app/catering/week`)
  .add("app/catering/month", `/:lng(${languagesPattern})/app/catering/month`)
  .add("app/catering/year", `/:lng(${languagesPattern})/app/catering/year`)
  .add("app/catering/create", `/:lng(${languagesPattern})/app/catering/create`)
  .add("app/lefood/orders", `/:lng(${languagesPattern})/app/lefood/orders`)
  .add(
    "app/lefood/deliveries",
    `/:lng(${languagesPattern})/app/lefood/delivery-area`
  )
  .add("app/lefood/menu", `/:lng(${languagesPattern})/app/lefood/menu`)
  .add(
    "app/lefood/orderingHours",
    `/:lng(${languagesPattern})/app/lefood/ordering-hours`
  )
  .add("app/stripeOauth", `/:lng(${languagesPattern})/stripe-oauth`)
  .add(
    "app/subscriptions/plans",
    `/:lng(${languagesPattern})/app/subscriptions/plans`
  )
  .add("app/subscriptions", `/:lng(${languagesPattern})/app/subscriptions`);
