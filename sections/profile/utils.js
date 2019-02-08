/* eslint-disable import/prefer-default-export */

export const generateMenuItems = (t, active, showPublishModal) => [
  {
    route: `/app/profile/basic-information/`,
    label: t("app:manageProfile.basicInformation"),
    isActive: active === "basicInformation"
  },
  {
    route: `/app/profile/contact-information/`,
    label: t("app:manageProfile.contactInformation"),
    isActive: active === "contactInformation"
  },
  {
    route: `/app/profile/opening-hours/`,
    label: t("app:manageProfile.openingHours"),
    isActive: active === "openingHours"
  },
  {
    route: `/app/profile/pictures-and-menus/`,
    label: t("app:manageProfile.picturesAndMenus"),
    isActive: active === "picturesAndMenus"
  },
  {
    route: `/app/profile/additional-information/`,
    label: t("app:manageProfile.additionalInformation"),
    isActive: active === "additionalInformation"
  },
  {
    route: `/app/profile/members/`,
    label: t("app:manageProfile.inviteYourTeam"),
    isActive: active === "inviteYourTeam"
  },
  {
    onClick: showPublishModal,
    label: t("app:manageProfile.publish"),
    isActive: false
  }
];

export const prepareBusinessesList = (t, businesses) =>
  businesses
    ? businesses.map(b => ({
        value: b.id,
        label: b.name || t("app:manageProfile.unnamedBusiness"),
        src: b.logo.url
      }))
    : [];
