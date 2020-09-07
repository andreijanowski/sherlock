export const generatePlanOptionsList = (planName, t) => {
  switch (planName) {
    case "tailored":
    case "special":
      return [
        {
          name: t("plans:options.delivery"),
          discount: "0%"
        },
        {
          name: t("plans:options.takeAway"),
          discount: "0%"
        },
        {
          name: t("plans:options.catering"),
          discount: "0%"
        },
        {
          name: t("plans:options.privatisation"),
          discount: "0%"
        },
        {
          name: t("plans:options.reservations"),
          discount: "0%"
        },
        {
          name: t("plans:options.payments"),
          discount: ""
        },
        {
          name: t("plans:options.reviews")
        },
        {
          name: t("plans:options.wholesalers")
        },
        {
          name: t("plans:options.widgets")
        },
        {
          name: t("plans:options.integrations")
        },
        {
          name: t("plans:options.dashboard")
        },
        {
          name: t("plans:options.visibility")
        }
      ];
    case "essential":
      return [
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
          name: t("plans:options.reservations"),
          discount: "€0,5"
        },
        {
          name: t("plans:options.payments"),
          discount: ""
        },
        {
          name: t("plans:options.reviews")
        },
        {
          name: t("plans:options.wholesalers")
        },
        {
          name: t("plans:options.widgets")
        },
        {
          name: t("plans:options.integrations")
        },
        {
          name: t("plans:options.dashboard")
        }
      ];
    case "basic":
      return [
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
          name: t("plans:options.reservations"),
          discount: "€1"
        },
        {
          name: t("plans:options.reviews")
        },
        {
          name: t("plans:options.wholesalers")
        }
      ];
    default:
      return [];
  }
};
