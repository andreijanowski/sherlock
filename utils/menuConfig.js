import {
  Delivery,
  Bookings,
  Restaurant,
  ProfileBasicInfo,
  ProfileOpeningHours,
  ProfilePicturesAndMenus,
  ProfileAdditionaInfo,
  ProfileMembers,
  SettingsBasicInfo,
  SettingsLogout,
  SettingsPassword,
  IntegrationHub,
  Wholesalers,
  MenuManagement,
  Clients,
  CommunityManagement,
  Dashboard,
  Detectives,
  Marketing,
  Payments,
  Photography,
  Reviews,
  StockManagement,
  Payroll,
  FoodWaste,
  PresenceManagement,
  CustomerLoyalty,
  EventsManagement,
  Catering,
  PrivateEvents,
  InfluencerManagement,
  Intelligence
} from "components/Icons";
import { PARTNERS_CATEGORIES } from "sections/integrations/utils";

const generateSettingsSubmenu = (t, logout) => [
  {
    basePath: `/app/settings/basic-information/`,
    route: `/app/settings/basic-information/`,
    label: t("app:userSettings.basicInformation"),
    icon: SettingsBasicInfo
  },
  {
    basePath: `/app/settings/password/`,
    route: `/app/settings/password/`,
    label: t("app:userSettings.password"),
    icon: SettingsPassword
  },
  {
    onClick: logout,
    label: t("app:userSettings.logout"),
    icon: SettingsLogout
  }
];

export const PROFILE_BASE_PATH = "/app/profile";

export const generateProfileSubmenu = t => [
  {
    basePath: `${PROFILE_BASE_PATH}/basic-information/`,
    route: `${PROFILE_BASE_PATH}/basic-information/`,
    label: t("app:manageProfile.basicInformation"),
    icon: ProfileBasicInfo
  },
  {
    basePath: `${PROFILE_BASE_PATH}/opening-hours/`,
    route: `${PROFILE_BASE_PATH}/opening-hours/`,
    label: t("app:manageProfile.openingHours"),
    icon: ProfileOpeningHours
  },
  {
    basePath: `${PROFILE_BASE_PATH}/pictures-and-menus/`,
    route: `${PROFILE_BASE_PATH}/pictures-and-menus/`,
    label: t("app:manageProfile.picturesAndMenus"),
    icon: ProfilePicturesAndMenus
  },
  {
    basePath: `${PROFILE_BASE_PATH}/additional-information/`,
    route: `${PROFILE_BASE_PATH}/additional-information/`,
    label: t("app:manageProfile.additionalInformation"),
    icon: ProfileAdditionaInfo
  },
  {
    basePath: `${PROFILE_BASE_PATH}/redirection-links/`,
    route: `${PROFILE_BASE_PATH}/redirection-links/`,
    label: t("additionalInformation:redirectionLinks"),
    icon: ProfileAdditionaInfo
  },
  {
    basePath: `${PROFILE_BASE_PATH}/members/`,
    route: `${PROFILE_BASE_PATH}/members/`,
    label: t("app:manageProfile.inviteYourTeam"),
    icon: ProfileMembers
  },
  {
    basePath: `${PROFILE_BASE_PATH}/live-info/`,
    route: `${PROFILE_BASE_PATH}/live-info/`,
    label: t("app:manageProfile.liveInfo"),
    icon: ProfileAdditionaInfo
  },
  {
    basePath: `${PROFILE_BASE_PATH}/widgets/`,
    route: `${PROFILE_BASE_PATH}/widgets/`,
    label: t("app:manageProfile.widgets"),
    icon: ProfileAdditionaInfo
  }
];

const generateEventsManagementSubmenu = t => [
  {
    icon: Catering,
    label: t("app:catering"),
    basePath: "/app/events-management/catering/",
    route: "/app/events-management/catering/month/"
  },
  {
    icon: PrivateEvents,
    label: t("app:privateEvents"),
    basePath: "/app/events-management/privatisation/",
    route: "/app/events-management/privatisation/month/"
  }
];

const generateIntegrationsSubmenu = t =>
  PARTNERS_CATEGORIES.map(category =>
    category
      ? {
          route: `/app/integrations?category=${category}`,
          label: t(`app:manageIntegrations.${category}`)
        }
      : {
          route: `/app/integrations`,
          label: t(`app:manageIntegrations.all`)
        }
  );

export const INFLUENCER_MANAGEMENT_BASE_PATH = "/app/influencer-management";

const generateInfluencerManagementSubmenu = t => [
  {
    basePath: `${INFLUENCER_MANAGEMENT_BASE_PATH}/detectives`,
    route: `${INFLUENCER_MANAGEMENT_BASE_PATH}/detectives`,
    icon: Detectives,
    label: t("app:detectives")
  },
  {
    basePath: `${INFLUENCER_MANAGEMENT_BASE_PATH}/community-management/`,
    route: `${INFLUENCER_MANAGEMENT_BASE_PATH}/community-management/`,
    icon: CommunityManagement,
    label: t("app:manageIntegrations.community_management")
  },
  {
    basePath: `${INFLUENCER_MANAGEMENT_BASE_PATH}/marketing/`,
    route: `${INFLUENCER_MANAGEMENT_BASE_PATH}/marketing/`,
    icon: Marketing,
    label: t("app:adsAndMarketing")
  },
  {
    basePath: `${INFLUENCER_MANAGEMENT_BASE_PATH}/photography/`,
    route: `${INFLUENCER_MANAGEMENT_BASE_PATH}/photography/`,
    icon: Photography,
    label: t("app:photography")
  }
];

const prepareBadge = updates => {
  if (!updates) return null;
  return updates < 10 ? updates : "9+";
};

export const getMenuConfig = ({
  t,
  ordersUpdates,
  reservationsUpdates,
  logout
  // intelligenceUpdates
}) => [
  {
    basePath: "/app/dashboard",
    route: "/app/dashboard/",
    icon: Dashboard,
    label: t("app:dashboardView.dashboard")
  },
  {
    basePath: "/app/intelligence",
    route: "/app/intelligence",
    icon: Intelligence,
    label: t("app:Intelligence")
    // badge: prepareBadge(intelligenceUpdates)
  },
  {
    basePath: PROFILE_BASE_PATH,
    route: `${PROFILE_BASE_PATH}/basic-information/`,
    icon: Restaurant,
    label: t("app:manageProfile.myProfile"),
    submenuItems: generateProfileSubmenu(t)
  },
  {
    basePath: "/app/integrations",
    route: "/app/integrations",
    icon: IntegrationHub,
    label: t("app:integrationHub"),
    submenuItems: generateIntegrationsSubmenu(t)
  },
  {
    groupTitle: t("app:managementIntegrations"),
    items: [
      {
        basePath: "/app/lefood/",
        route: "/app/lefood/orders/",
        icon: Delivery,
        label: t("app:delivery"),
        badge: prepareBadge(ordersUpdates)
      },
      {
        basePath: "/app/menu-management",
        route: "/app/menu-management",
        icon: MenuManagement,
        label: t("app:menuManagement")
      },
      {
        basePath: "/app/reservation",
        route: "/app/reservation/reservations/",
        icon: Bookings,
        label: t("app:reservations"),
        badge: prepareBadge(reservationsUpdates)
      },
      {
        basePath: "/app/events-management",
        route: "/app/events-management/catering/month",
        icon: EventsManagement,
        label: t("app:eventsManagement"),
        submenuItems: generateEventsManagementSubmenu(t)
      },
      {
        basePath: "/app/clients",
        route: "/app/clients/",
        icon: Clients,
        label: t("app:clients")
      }
    ]
  },
  {
    groupTitle: t("app:operationsIntegrations"),
    items: [
      {
        basePath: "/app/payments",
        route: "/app/payments",
        icon: Payments,
        label: t("app:payments")
      },
      {
        basePath: "/app/wholesalers",
        route: "/app/wholesalers",
        icon: Wholesalers,
        label: t("app:wholesaler")
      },
      {
        basePath: "/app/stock-management",
        route: "/app/stock-management/",
        icon: StockManagement,
        label: t("app:stockManagement")
      },
      {
        basePath: "/app/payroll",
        route: "/app/payroll/",
        icon: Payroll,
        label: t("app:payroll")
      },
      {
        basePath: "/app/food-waste",
        route: "/app/food-waste/",
        icon: FoodWaste,
        label: t("app:foodWaste")
      }
    ]
  },
  {
    groupTitle: t("app:marketingIntegrations"),
    items: [
      {
        basePath: INFLUENCER_MANAGEMENT_BASE_PATH,
        route: `${INFLUENCER_MANAGEMENT_BASE_PATH}/detectives`,
        icon: InfluencerManagement,
        label: t("app:influencerManagement"),
        submenuItems: generateInfluencerManagementSubmenu(t)
      },
      {
        basePath: "/app/presence-management",
        route: "/app/presence-management/",
        icon: PresenceManagement,
        label: t("app:presenceManagement")
      },
      {
        basePath: "/app/reviews",
        route: "/app/reviews/",
        icon: Reviews,
        label: t("app:reviews")
      },
      {
        basePath: "/app/loyalty",
        route: "/app/loyalty/",
        icon: CustomerLoyalty,
        label: t("app:loyalty")
      }
    ]
  },
  {
    basePath: "/app/subscriptions",
    route: "/app/subscriptions/",
    label: t("app:subscriptions")
  },
  {
    basePath: "/app/settings",
    route: "/app/settings/basic-information/",
    label: t("app:settings"),
    submenuItems: generateSettingsSubmenu(t, logout)
  }
];

export const isMenuItemActive = ({ lng, asPath, menuItem }) =>
  menuItem.basePath
    ? asPath.startsWith(`/${lng}${menuItem.basePath}`)
    : asPath === `/${lng}${menuItem.route}`;
