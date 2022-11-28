const routes = require("next-routes");
const { languagesPattern } = require("./consts");

module.exports = routes()
  .add("landing", `/:lng(${languagesPattern})`)
  .add(
    "pricing/subscriptions",
    `/:lng(${languagesPattern})/pricing/subscriptions`
  )
  .add("referrals", `/:lng(${languagesPattern})/referrals`)
  .add("add/venue", `/:lng(${languagesPattern})/add/venue`)
  .add("app/index", `/:lng(${languagesPattern})/app`)
  .add(
    "app/profile/basicInformation",
    `/:lng(${languagesPattern})/app/profile/basic-information`
  )
  .add("app/profile/members", `/:lng(${languagesPattern})/app/profile/members`)
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
    "app/profile/liveInfo",
    `/:lng(${languagesPattern})/app/profile/live-info`
  )
  .add("app/profile/widgets", `/:lng(${languagesPattern})/app/profile/widgets`)
  .add(
    "app/profile/redirectionLinks",
    `/:lng(${languagesPattern})/app/profile/redirection-links`
  )
  .add(
    "app/settings/basicInformation",
    `/:lng(${languagesPattern})/app/settings/basic-information`
  )
  .add(
    "app/settings/password",
    `/:lng(${languagesPattern})/app/settings/password`
  )
  .add(
    "app/eventsManagement/catering/day",
    `/:lng(${languagesPattern})/app/events-management/catering/day`
  )
  .add(
    "app/eventsManagement/catering/week",
    `/:lng(${languagesPattern})/app/events-management/catering/week`
  )
  .add(
    "app/eventsManagement/catering/month",
    `/:lng(${languagesPattern})/app/events-management/catering/month`
  )
  .add(
    "app/eventsManagement/catering/year",
    `/:lng(${languagesPattern})/app/events-management/catering/year`
  )
  .add(
    "app/eventsManagement/catering/edit",
    `/:lng(${languagesPattern})/app/events-management/catering/edit`
  )
  .add(
    "app/eventsManagement/catering/create",
    `/:lng(${languagesPattern})/app/events-management/catering/create`
  )
  .add(
    "app/eventsManagement/privatisation/day",
    `/:lng(${languagesPattern})/app/events-management/privatisation/day`
  )
  .add(
    "app/eventsManagement/privatisation/week",
    `/:lng(${languagesPattern})/app/events-management/privatisation/week`
  )
  .add(
    "app/eventsManagement/privatisation/month",
    `/:lng(${languagesPattern})/app/events-management/privatisation/month`
  )
  .add(
    "app/eventsManagement/privatisation/year",
    `/:lng(${languagesPattern})/app/events-management/privatisation/year`
  )
  .add(
    "app/eventsManagement/privatisation/edit",
    `/:lng(${languagesPattern})/app/events-management/privatisation/edit`
  )
  .add(
    "app/eventsManagement/privatisation/create",
    `/:lng(${languagesPattern})/app/events-management/privatisation/create`
  )
  .add("app/lefood/orders", `/:lng(${languagesPattern})/app/lefood/orders`)
  .add(
    "app/lefood/deliveries",
    `/:lng(${languagesPattern})/app/lefood/delivery-area`
  )
  .add(
    "app/lefood/orderingHours",
    `/:lng(${languagesPattern})/app/lefood/ordering-hours`
  )
  .add(
    "app/lefood/ordersHistory",
    `/:lng(${languagesPattern})/app/lefood/orders-history`
  )
  .add(
    "app/reservation/reservations",
    `/:lng(${languagesPattern})/app/reservation/reservations`
  )
  .add(
    "app/reservation/create",
    `/:lng(${languagesPattern})/app/reservation/create`
  )
  .add(
    "app/reservation/edit",
    `/:lng(${languagesPattern})/app/reservation/edit`
  )
  .add(
    "app/reservation/tables",
    `/:lng(${languagesPattern})/app/reservation/tables`
  )
  .add("app/stripeOauth", `/:lng(${languagesPattern})/stripe-oauth`)
  .add("app/subscriptions", `/:lng(${languagesPattern})/app/subscriptions`)
  .add("app/integrations", `/:lng(${languagesPattern})/app/integrations`)
  .add("app/suppliers", `/:lng(${languagesPattern})/app/suppliers`)
  .add("app/products", `/:lng(${languagesPattern})/app/suppliers/:id/products`)
  .add("app/cart", `/:lng(${languagesPattern})/app/cart`)
  .add(
    "app/influencerManagement/marketing",
    `/:lng(${languagesPattern})/app/influencer-management/marketing`
  )
  .add(
    "app/influencerManagement/communityManagement",
    `/:lng(${languagesPattern})/app/influencer-management/community-management`
  )
  .add(
    "app/influencerManagement/photography",
    `/:lng(${languagesPattern})/app/influencer-management/photography`
  )
  .add(
    "app/influencerManagement/detectives",
    `/:lng(${languagesPattern})/app/influencer-management/detectives`
  )
  .add("app/menuManagement", `/:lng(${languagesPattern})/app/menu-management`)
  .add("app/dashboard", `/:lng(${languagesPattern})/app/dashboard`)
  .add("app/intelligence", `/:lng(${languagesPattern})/app/intelligence`)
  .add("app/clients", `/:lng(${languagesPattern})/app/clients`)
  .add("app/payments", `/:lng(${languagesPattern})/app/payments`)
  .add("app/reviews", `/:lng(${languagesPattern})/app/reviews`)
  .add(
    "app/presenceManagement",
    `/:lng(${languagesPattern})/app/presence-management`
  )
  .add("product/management", `/:lng(${languagesPattern})/product/management`)
  .add("product/operations", `/:lng(${languagesPattern})/product/operations`)
  .add("product/analytics", `/:lng(${languagesPattern})/product/analytics`)
  .add("product/marketing", `/:lng(${languagesPattern})/product/marketing`)
  .add("howItWorks", `/:lng(${languagesPattern})/how-it-works`)
  .add("customers", `/:lng(${languagesPattern})/customers`)
  .add("developers", `/:lng(${languagesPattern})/developers`)
  .add("demo_booked", `/:lng(${languagesPattern})/demo_booked`)
  .add("newsroom", `/:lng(${languagesPattern})/newsroom`)
  .add(
    "blogposts/detail",
    `/:lng(${languagesPattern})/blog-posts/:category/:slug/:id`
  )
  .add(
    "sign-up-confirmation",
    `/:lng(${languagesPattern})/sign-up-confirmation`
  )
  .add("app/comingSoon", [
    `/:lng(${languagesPattern})/app/app-manager`,
    `/:lng(${languagesPattern})/app/reviews`,
    `/:lng(${languagesPattern})/app/stock-management`,
    `/:lng(${languagesPattern})/app/payroll`,
    `/:lng(${languagesPattern})/app/food-waste`,
    `/:lng(${languagesPattern})/app/loyalty`
  ]);
