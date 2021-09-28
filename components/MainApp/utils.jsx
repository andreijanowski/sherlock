import {
  Restaurant,
  SettingsIcon,
  Catering,
  Subscriptions,
  PrivateEvents,
  Bookings,
  Delivery,
  IntegrationHub,
  Wholesalers,
  Marketing,
  CommunityManagement,
  Photography,
  Detectives,
  AppManager,
  Dashboard,
  Clients,
  Payments
} from "icons";

export const chooseIcon = icon => {
  switch (icon) {
    case "profile":
      return Restaurant;
    case "settings":
      return SettingsIcon;
    case "catering":
      return Catering;
    case "leFood":
      return Delivery;
    case "subscriptions":
      return Subscriptions;
    case "integrations":
      return IntegrationHub;
    case "wholesalers":
      return Wholesalers;
    case "privatisation":
      return PrivateEvents;
    case "reservation":
      return Bookings;
    case "marketing":
      return Marketing;
    case "community-management":
      return CommunityManagement;
    case "photography":
      return Photography;
    case "detectives":
      return Detectives;
    case "appManager":
      return AppManager;
    case "clients":
      return Clients;
    case "payments":
      return Payments;
    case "dashboard":
      return Dashboard;
    default:
      return () => "";
  }
};

export const getButtonRoutes = (menuItems, mainIcon) => {
  let prevRoute = null;
  let nextRoute = null;

  if (menuItems && mainIcon === "profile") {
    const activeTabIndex = menuItems.findIndex(item => item.isActive);
    prevRoute = activeTabIndex > 0 ? menuItems[activeTabIndex - 1].route : null;
    nextRoute =
      activeTabIndex + 1 < menuItems.length - 1
        ? menuItems[activeTabIndex + 1].route
        : null;
  }

  return { prevRoute, nextRoute };
};
