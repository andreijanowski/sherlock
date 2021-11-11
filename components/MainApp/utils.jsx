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
  MenuManagement,
  Dashboard,
  Clients,
  Payments
} from "icons";
import { generateProfileSubmenu, isMenuItemActive } from "utils/menuConfig";

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
    case "menu-management":
      return MenuManagement;
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

const getPrevAndNextButtons = (items, activeIndex) => ({
  prevRoute: activeIndex > 0 ? items[activeIndex - 1].route : null,
  nextRoute:
    activeIndex + 1 < items.length ? items[activeIndex + 1].route : null
});

export const getButtonRoutes = ({ lng, asPath, mainIcon }) => {
  if (mainIcon === "profile") {
    const profileMenuItems = generateProfileSubmenu(() => {});

    const activeTabIndex = profileMenuItems.findIndex(menuItem =>
      isMenuItemActive({
        lng,
        asPath,
        menuItem
      })
    );
    return getPrevAndNextButtons(profileMenuItems, activeTabIndex);
  }

  return { prevRoute: null, nextRoute: null };
};
