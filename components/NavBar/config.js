import {
  Restaurant,
  Dashboard,
  IntegrationHub,
  MenuManagement,
  Payments,
  Delivery,
  Bookings,
  Catering,
  PrivateEvents,
  Reviews,
  Detectives,
  CommunityManagement,
  Marketing,
  Clients,
  Wholesalers,
  StockManagement,
  Subscriptions,
  SettingsIcon,
  Photography,
  AppManager,
  Payroll,
  FoodWaste,
  PresenceManagement,
  CustomerLoyalty
} from "components/Icons";

const prepareBadge = updates => {
  if (!updates) return null;
  return updates < 10 ? updates : "9+";
};

export const getNavConfig = ({ t, ordersUpdates, reservationsUpdates }) => [
  {
    basePath: "/app/dashboard",
    route: "/app/dashboard/",
    Icon: Dashboard,
    label: t("app:dashboardView.dashboard")
  },
  {
    basePath: "/app/profile",
    route: "/app/profile/basic-information/",
    Icon: Restaurant,
    label: t("app:manageProfile.myProfile"),
    hasNested: true
  },
  {
    basePath: "/app/integrations",
    route: "/app/integrations",
    Icon: IntegrationHub,
    label: t("app:integrationHub"),
    hasNested: true
  },
  {
    basePath: "/app/app-manager",
    route: "/app/app-manager",
    Icon: AppManager,
    label: t("app:appManager")
  },
  {
    basePath: "/app/lefood/",
    route: "/app/lefood/orders/",
    Icon: Delivery,
    label: t("app:delivery"),
    badge: prepareBadge(ordersUpdates)
  },
  {
    basePath: "/app/menu-management",
    route: "/app/menu-management",
    Icon: MenuManagement,
    label: t("app:menuManagement")
  },
  {
    basePath: "/app/reservation",
    route: "/app/reservation/reservations/",
    Icon: Bookings,
    label: t("app:reservations"),
    badge: prepareBadge(reservationsUpdates)
  },
  {
    basePath: "/app/catering",
    route: "/app/catering/month/",
    Icon: Catering,
    label: t("app:catering")
  },
  {
    basePath: "/app/privatisation",
    route: "/app/privatisation/month/",
    Icon: PrivateEvents,
    label: t("app:privateEvents")
  },
  {
    basePath: "/app/clients",
    route: "/app/clients/",
    Icon: Clients,
    label: t("app:clients")
  },
  {
    basePath: "/app/payments",
    route: "/app/payments",
    Icon: Payments,
    label: t("app:payments")
  },
  {
    basePath: "/app/wholesalers",
    route: "/app/wholesalers?category=preferred",
    Icon: Wholesalers,
    label: t("app:wholesaler"),
    hasNested: true
  },
  {
    basePath: "/app/stock-management",
    route: "/app/stock-management/",
    Icon: StockManagement,
    label: t("app:stockManagement")
  },
  {
    basePath: "/app/payroll",
    route: "/app/payroll/",
    Icon: Payroll,
    label: t("app:payroll")
  },
  {
    basePath: "/app/food-waste",
    route: "/app/food-waste/",
    Icon: FoodWaste,
    label: t("app:foodWaste")
  },
  {
    basePath: "/app/detectives",
    route: "/app/detectives/",
    Icon: Detectives,
    label: t("app:detectives")
  },
  {
    basePath: "/app/community-management",
    route: "/app/community-management/",
    Icon: CommunityManagement,
    label: t("app:manageIntegrations.community_management")
  },
  {
    basePath: "/app/presence-management",
    route: "/app/presence-management/",
    Icon: PresenceManagement,
    label: t("app:presenceManagement")
  },
  {
    basePath: "/app/reviews",
    route: "/app/reviews/",
    Icon: Reviews,
    label: t("app:reviews")
  },
  {
    basePath: "/app/marketing",
    route: "/app/marketing/",
    Icon: Marketing,
    label: t("app:adsAndMarketing")
  },
  {
    basePath: "/app/photography",
    route: "/app/photography/",
    Icon: Photography,
    label: t("app:photography")
  },
  {
    basePath: "/app/loyalty",
    route: "/app/loyalty/",
    Icon: CustomerLoyalty,
    label: t("app:loyalty")
  },
  {
    basePath: "/app/subscriptions",
    route: "/app/subscriptions/",
    Icon: Subscriptions,
    label: t("app:subscriptions")
  },
  {
    basePath: "/app/settings",
    route: "/app/settings/basic-information/",
    Icon: SettingsIcon,
    label: t("app:settings"),
    hasNested: true
  }
];
