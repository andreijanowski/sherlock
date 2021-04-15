export const generatePlanOptionsList = (planName, t) => {
  switch (planName) {
    case "basic":
      return [
        {
          name: t("plans:options.myProfile")
        },
        {
          name: t("plans:options.integrationHub")
        },
        {
          name: t("plans:options.deliveryManagement")
        },
        {
          discount: "10%",
          name: t("plans:options.deliveryTakeAway")
        },
        {
          discount: "€1",
          name: t("plans:options.bookings")
        },
        {
          discount: "10%",
          name: t("plans:options.catering")
        },
        {
          discount: "10%",
          name: t("plans:options.privateEvents")
        },
        {
          name: t("plans:options.communityManagement")
        },
        {
          name: t("plans:options.adsMarketing")
        },
        {
          name: t("plans:options.photography")
        },
        {
          name: t("plans:options.wholesalers")
        }
      ];
    case "essential":
      return [
        {
          name: t("plans:options.myProfile")
        },
        {
          name: t("plans:options.dashboard")
        },
        {
          name: t("plans:options.integrationHub")
        },
        {
          name: t("plans:options.deliveryManagement")
        },
        {
          name: t("plans:options.appManager")
        },
        {
          name: t("plans:options.payments")
        },
        {
          discount: "5%",
          name: t("plans:options.deliveryTakeAway")
        },
        {
          discount: "€0.5",
          name: t("plans:options.bookings")
        },
        {
          discount: "5%",
          name: t("plans:options.catering")
        },
        {
          discount: "5%",
          name: t("plans:options.privateEvents")
        },
        {
          name: t("plans:options.reviews")
        },
        {
          name: t("plans:options.detectives")
        },
        {
          name: t("plans:options.communityManagement")
        },
        {
          name: t("plans:options.adsMarketing")
        },
        {
          name: t("plans:options.photography")
        },
        {
          name: t("plans:options.clients")
        },
        {
          name: t("plans:options.wholesalers")
        }
      ];
    case "premium":
      return [
        {
          name: t("plans:options.myProfile")
        },
        {
          name: t("plans:options.dashboard")
        },
        {
          name: t("plans:options.integrationHub")
        },
        {
          name: t("plans:options.deliveryManagement")
        },
        {
          name: t("plans:options.appManager")
        },
        {
          discount: "0%",
          name: t("plans:options.payments")
        },
        {
          discount: "0%",
          name: t("plans:options.deliveryTakeAway")
        },
        {
          discount: "0%",
          name: t("plans:options.bookings")
        },
        {
          discount: "0%",
          name: t("plans:options.catering")
        },
        {
          discount: "0%",
          name: t("plans:options.privateEvents")
        },
        {
          name: t("plans:options.reviews")
        },
        {
          name: t("plans:options.detectives")
        },
        {
          name: t("plans:options.communityManagement")
        },
        {
          name: t("plans:options.adsMarketing")
        },
        {
          name: t("plans:options.photography")
        },
        {
          name: t("plans:options.clients")
        },
        {
          name: t("plans:options.wholesalers")
        },
        {
          name: t("plans:options.stockManagement")
        },
        {
          name: t("plans:options.smartBackend")
        }
      ];
    case "special":
    default:
      return [];
  }
};
