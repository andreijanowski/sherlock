export const generateMenuItems = (t, active, logout) => [
  {
    route: `/app/settings/basic-information/`,
    label: t("app:userSettings.basicInformation"),
    isActive: active === "basicInformation"
  },
  {
    onClick: logout,
    label: t("app:userSettings.logout"),
    isActive: false
  }
];
