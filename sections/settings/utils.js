export const generateMenuItems = (t, active, logout) => [
  {
    route: `/app/settings/basic-information/`,
    label: t("app:userSettings.basicInformation"),
    isActive: active === "basicInformation"
  },
  {
    route: `/app/settings/billing/`,
    label: t("app:userSettings.billing"),
    isActive: active === "billing"
  },
  {
    route: `/app/settings/password/`,
    label: t("app:userSettings.password"),
    isActive: active === "password"
  },
  {
    onClick: logout,
    label: t("app:userSettings.logout"),
    isActive: false
  }
];
