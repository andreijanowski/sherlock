export const generatePlanOptionsList = (planName, t) => {
  switch (planName) {
    case "essential":
      return [
        {
          name: t("plans:options.website")
        },
        {
          name: t("plans:options.mobileApp")
        },
        {
          name: t("plans:options.paidReservation"),
          discount: "1€"
        },
        {
          name: t("plans:options.delivery"),
          discount: "10%"
        },
        {
          name: t("plans:options.takeAway"),
          discount: "10%"
        },
        {
          name: t("plans:options.catering"),
          discount: "10%"
        },
        {
          name: t("plans:options.privatisation"),
          discount: "10%"
        },
        {
          name: t("plans:options.redirections")
        }
      ];
    case "basic":
      return [
        {
          name: t("plans:options.website")
        },
        {
          name: t("plans:options.mobileApp")
        },
        {
          name: t("plans:options.reservations"),
          discount: "Free"
        },
        {
          name: t("plans:options.delivery"),
          discount: "5%"
        },
        {
          name: t("plans:options.takeAway"),
          discount: "5%"
        },
        {
          name: t("plans:options.catering"),
          discount: "5%"
        },
        {
          name: t("plans:options.privatisation"),
          discount: "5%"
        },
        {
          name: t("plans:options.widget")
        },
        {
          name: t("plans:options.digitalMarketing")
        },
        {
          name: t("plans:options.redirections")
        }
      ];
    default:
      return [];
  }
};
