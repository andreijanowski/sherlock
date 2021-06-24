import {
  Delivery,
  Bookings,
  PrivateEvents,
  Catering,
  Restaurant,
  ProfileBasicInfo,
  ProfileOpeningHours,
  ProfilePicturesAndMenus,
  ProfileAdditionaInfo,
  ProfileMembers,
  Subscriptions,
  SettingsIcon,
  SettingsBasicInfo,
  SettingsLogout,
  SettingsPassword,
  IntegrationHub,
  Wholesalers,
  AppManager,
  Clients,
  CommunityManagement,
  Dashboard,
  Detectives,
  Marketing,
  Payments,
  Photography,
  Reviews,
  StockManagement
} from "icons";
import {
  PARTNERS_CATEGORIES,
  WHOLESALERS_CATEGORIES
} from "sections/integrations/utils";

const generateSettingsMobileSubmenu = (t, active, logout) => [
  {
    route: `/app/settings/basic-information/`,
    label: t("app:userSettings.basicInformation"),
    isActive: active === "basicInformation",
    SubmenuIcon: SettingsBasicInfo
  },
  {
    route: `/app/settings/password/`,
    label: t("app:userSettings.password"),
    isActive: active === "password",
    SubmenuIcon: SettingsPassword
  },
  {
    onClick: logout,
    label: t("app:userSettings.logout"),
    isActive: false,
    SubmenuIcon: SettingsLogout
  }
];

const generateProfileMobileSubmenu = (t, active) => [
  {
    route: `/app/profile/basic-information/`,
    label: t("app:manageProfile.basicInformation"),
    isActive: active === "basicInformation",
    SubmenuIcon: ProfileBasicInfo
  },
  {
    route: `/app/profile/opening-hours/`,
    label: t("app:manageProfile.openingHours"),
    isActive: active === "openingHours",
    SubmenuIcon: ProfileOpeningHours
  },
  {
    route: `/app/profile/pictures-and-menus/`,
    label: t("app:manageProfile.picturesAndMenus"),
    isActive: active === "picturesAndMenus",
    SubmenuIcon: ProfilePicturesAndMenus
  },
  {
    route: `/app/profile/additional-information/`,
    label: t("app:manageProfile.additionalInformation"),
    isActive: active === "additionalInformation",
    SubmenuIcon: ProfileAdditionaInfo
  },
  {
    route: `/app/profile/redirection-links/`,
    label: t("additionalInformation:redirectionLinks"),
    isActive: active === "redirectionLinks",
    SubmenuIcon: ProfileAdditionaInfo
  },
  {
    route: `/app/profile/members/`,
    label: t("app:manageProfile.inviteYourTeam"),
    isActive: active === "inviteYourTeam",
    SubmenuIcon: ProfileMembers
  },
  {
    route: `/app/profile/live-info/`,
    label: t("app:manageProfile.liveInfo"),
    isActive: active === "liveInfo",
    SubmenuIcon: ProfileAdditionaInfo
  },
  {
    route: `/app/profile/widgets/`,
    label: t("app:manageProfile.widgets"),
    isActive: active === "widgets",
    SubmenuIcon: ProfileAdditionaInfo
  }
];

const generateIntegrationsMobileSubmenu = (t, activeTab) =>
  PARTNERS_CATEGORIES.map(category =>
    category
      ? {
          route: `/app/integrations?category=${category}`,
          label: t(`app:manageIntegrations.${category}`),
          isActive: activeTab === category
        }
      : {
          route: `/app/integrations`,
          label: t(`app:manageIntegrations.all`),
          isActive: !activeTab
        }
  );

const generateWholesalersMobileSubmenu = (t, activeTab) =>
  WHOLESALERS_CATEGORIES.map(category =>
    category
      ? {
          route: `/app/wholesalers?category=${category}`,
          label: t(`app:wholesalersCategories.${category}`),
          isActive: activeTab === category
        }
      : {
          route: `/app/wholesalers`,
          label: t(`app:wholesalersCategories.allProducts`),
          isActive: !activeTab
        }
  );

export const generateToggledMobileMenuSubitems = (t, lng, logout) => [
  {
    icon: Restaurant,
    label: t("app:manageProfile.manageProfile"),
    withSubmenu: true,
    submenuItems: generateProfileMobileSubmenu(t, lng)
  },
  {
    basePath: "/app/dashboard",
    route: "/app/dashboard/",
    icon: Dashboard,
    label: t("app:dashboard")
  },
  {
    icon: IntegrationHub,
    label: t("app:integrationHub"),
    withSubmenu: true,
    submenuItems: generateIntegrationsMobileSubmenu(t, lng)
  },
  {
    basePath: "/app/app-manager",
    route: "/app/app-manager",
    icon: AppManager,
    label: t("app:appManager")
  },
  {
    basePath: "/app/payments",
    route: "/app/payments",
    icon: Payments,
    label: t("app:payments")
  },
  {
    icon: Delivery,
    label: t("app:delivery"),
    route: "/app/lefood/orders/"
  },
  {
    icon: Bookings,
    label: t("app:reservations"),
    route: "/app/reservation/reservations/"
  },
  {
    icon: Catering,
    label: t("app:catering"),
    route: "/app/catering/month/"
  },
  {
    icon: PrivateEvents,
    label: t("app:privateEvents"),
    route: "/app/privatisation/month/"
  },
  {
    basePath: "/app/reviews",
    route: "/app/reviews/",
    icon: Reviews,
    label: t("app:reviews")
  },
  {
    basePath: "/app/detectives",
    route: "/app/detectives/",
    icon: Detectives,
    label: t("app:detectives")
  },
  {
    basePath: "/app/community-management",
    route: "/app/community-management/",
    icon: CommunityManagement,
    label: t("app:manageIntegrations.community_management")
  },
  {
    basePath: "/app/marketing",
    route: "/app/marketing/",
    icon: Marketing,
    label: t("app:adsAndMarketing")
  },
  {
    basePath: "/app/photography",
    route: "/app/photography/",
    icon: Photography,
    label: t("app:photography")
  },
  {
    basePath: "/app/clients",
    route: "/app/clients/",
    icon: Clients,
    label: t("app:clients")
  },
  {
    icon: Wholesalers,
    label: t("app:wholesaler"),
    withSubmenu: true,
    submenuItems: generateWholesalersMobileSubmenu(t, lng)
  },
  {
    basePath: "/app/stock-management",
    route: "/app/stock-management/",
    icon: StockManagement,
    label: t("app:stockManagement")
  },
  {
    icon: Subscriptions,
    label: t("app:subscriptions"),
    route: "/app/subscriptions/"
  },
  {
    icon: SettingsIcon,
    label: t("app:userSettings.userSettings"),
    withSubmenu: true,
    submenuItems: generateSettingsMobileSubmenu(t, lng, logout)
  }
];
