import React from "react";

import {
  ProfileIcon,
  SettingsIcon,
  Catering,
  Subscriptions,
  Privatisations,
  Reservations,
  Delivery
} from "icons";

export const chooseIcon = icon => {
  switch (icon) {
    case "profile":
      return ProfileIcon;
    case "settings":
      return SettingsIcon;
    case "catering":
      return Catering;
    case "leFood":
      return Delivery;
    case "subscriptions":
      return Subscriptions;
    case "privatisations":
      return Privatisations;
    case "reservation":
      return Reservations;
    default:
      return () => <></>;
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
