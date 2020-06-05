import {
  Delivery,
  Reservations,
  Privatisations,
  Catering,
  ProfileIcon,
  ProfileBasicInfo,
  ProfileContact,
  ProfileOpeningHours,
  ProfilePicturesAndMenus,
  ProfileAdditionaInfo,
  ProfileMembers,
  Subscriptions,
  SettingsIcon,
  SettingsBasicInfo,
  SettingsLogout,
  SettingsPassword,
  Integrations
} from "icons";
import { categories } from "sections/integrations/utils";

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
    route: `/app/profile/contact-information/`,
    label: t("app:manageProfile.contactInformation"),
    isActive: active === "contactInformation",
    SubmenuIcon: ProfileContact
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
  categories.map(category => ({
    route: `/app/integrations?category=${category}`,
    label: t(`app:manageIntegrations.${category}`),
    isActive: activeTab === category
  }));

export const generateToggledMobileMenuSubitems = (t, lng, logout) => [
  {
    icon: ProfileIcon,
    label: t("app:manageProfile.manageProfile"),
    withSubmenu: true,
    submenuItems: generateProfileMobileSubmenu(t, lng)
  },
  {
    icon: Catering,
    label: t("app:catering"),
    route: "/app/catering/month/"
  },
  {
    icon: Privatisations,
    label: t("app:privatisations"),
    route: "/app/privatisation/month/"
  },
  {
    icon: Delivery,
    label: t("app:delivery"),
    route: "/app/lefood/orders/"
  },
  {
    icon: Reservations,
    label: t("app:reservations"),
    route: "/app/reservation/reservations/"
  },
  {
    icon: Integrations,
    label: t("app:integrations"),
    withSubmenu: true,
    submenuItems: generateIntegrationsMobileSubmenu(t, lng)
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
