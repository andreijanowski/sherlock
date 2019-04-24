import {
  Delivery,
  Bookings,
  Privatizations,
  LeFood,
  Billing,
  ProfileIcon,
  ProfileBasicInfo,
  ProfileContact,
  ProfileOpeningHours,
  ProfilePicturesAndMenus,
  ProfileAdditionaInfo,
  ProfileMembers,
  Subscriptions,
  SettingsIcon,
  Docs,
  Feedback,
  SettingsBasicInfo,
  SettingsPassword,
  SettingsLogout
} from "icons";

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
  }
];

export const generateToggledMobileMenuSubitems = (t, lng, logout) => [
  {
    icon: Delivery,
    label: t("app:delivery"),
    route: "/"
  },
  {
    icon: Bookings,
    label: "Bookings",
    route: "/"
  },
  {
    icon: Privatizations,
    label: t("app:privatizations"),
    route: "/"
  },
  {
    icon: LeFood,
    label: t("app:leFood"),
    route: "/"
  },
  {
    icon: Billing,
    label: t("app:billing"),
    route: "/"
  },
  {
    icon: ProfileIcon,
    label: t("app:manageProfile.manageProfile"),
    withSubmenu: true,
    submenuItems: generateProfileMobileSubmenu(t, lng)
  },
  {
    icon: Subscriptions,
    label: t("app:subscriptions"),
    route: "/"
  },
  {
    icon: Feedback,
    label: t("app:feedback"),
    route: "/"
  },
  {
    icon: Docs,
    label: t("app:docs"),
    route: "/"
  },
  {
    icon: SettingsIcon,
    label: t("app:userSettings.userSettings"),
    withSubmenu: true,
    submenuItems: generateSettingsMobileSubmenu(t, lng, logout)
  }
];
