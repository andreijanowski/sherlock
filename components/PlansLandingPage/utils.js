export const generatePlanOptionsList = (planName, t) => {
  switch (planName) {
    case "tailored":
    case "special":
      return [
        {
          name: t("plans:options.integrations")
        },
        {
          name: t("plans:options.reservations")
        },
        {
          name: t("plans:options.delivery")
        },
        {
          name: t("plans:options.takeAway")
        },
        {
          name: t("plans:options.catering")
        },
        {
          name: t("plans:options.privatisation")
        },
        {
          name: t("plans:options.reviews")
        },
        {
          name: t("plans:options.suppliers")
        },
        {
          name: t("plans:options.widgets")
        },
        {
          name: t("plans:options.dashboard")
        }
      ];
    case "essential":
      return [
        {
          name: t("plans:options.integrations")
        },
        {
          name: t("plans:options.reservations")
        },
        {
          name: t("plans:options.delivery")
        },
        {
          name: t("plans:options.takeAway")
        },
        {
          name: t("plans:options.catering")
        },
        {
          name: t("plans:options.privatisation")
        },
        {
          name: t("plans:options.reviews")
        },
        {
          name: t("plans:options.suppliers")
        },
        {
          name: t("plans:options.widgets")
        }
      ];
    case "basic":
      return [
        {
          name: t("plans:options.reservations"),
          discount: "Free"
        },
        {
          name: t("plans:options.delivery"),
          discount: "Free"
        },
        {
          name: t("plans:options.takeAway"),
          discount: "Free"
        },
        {
          name: t("plans:options.catering"),
          discount: "Free"
        },
        {
          name: t("plans:options.privatisation"),
          discount: "Free"
        }
      ];
    default:
      return [];
  }
};
