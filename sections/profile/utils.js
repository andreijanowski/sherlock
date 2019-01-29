/* eslint-disable import/prefer-default-export */

export const generateMenuItems = (t, active) => [
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
  }
];

export const prepareBusinessesList = businesses =>
  businesses
    ? businesses.map(b => ({
        value: b.id,
        label: b.name,
        src: b.logo.url
      }))
    : [];
