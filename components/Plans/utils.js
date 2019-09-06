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
          discount: "7%"
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
          name: t("plans:options.payments"),
          discount: "2.9%"
        },
        {
          name: t("plans:options.proFeedback")
        },
        {
          name: t("plans:options.widget"),
          isLighter: true
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
          discount: "3.5%"
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
          name: t("plans:options.payments"),
          discount: "2.9%"
        },
        {
          name: t("plans:options.proFeedback")
        },
        {
          name: t("plans:options.monthlyData"),
          isLighter: true,
          tooltipImage: "/static/img/controlCenter.png"
        },
        {
          name: t("plans:options.posIntegration"),
          isLighter: true,
          tooltipImage: "/static/img/integrations.png"
        },
        {
          name: t("plans:options.widget"),
          isLighter: true
        }
      ];
    case "premium":
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
          discount: "2%"
        },
        {
          name: t("plans:options.catering"),
          discount: "3.5%"
        },
        {
          name: t("plans:options.privatisation"),
          discount: "3.5%"
        },
        {
          name: t("plans:options.payments"),
          discount: "2.9%"
        },
        {
          name: t("plans:options.proFeedback")
        },
        {
          name: t("plans:options.weeklyData"),
          isLighter: true,
          tooltipImage: "/static/img/controlCenter.png"
        },
        {
          name: t("plans:options.posIntegration"),
          isLighter: true,
          tooltipImage: "/static/img/integrations.png"
        },
        {
          name: t("plans:options.archivedData"),
          isLighter: true,
          tooltipImage: "/static/img/documents.png"
        },
        {
          name: t("plans:options.photoshoot"),
          isLighter: true
        },
        {
          name: t("plans:options.mysteryShopping"),
          isLighter: true
        },
        {
          name: t("plans:options.widget"),
          isLighter: true
        }
      ];
    case "professional":
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
          discount: "Free"
        },
        {
          name: t("plans:options.catering"),
          discount: "Free"
        },
        {
          name: t("plans:options.privatisation"),
          discount: "Free"
        },
        {
          name: t("plans:options.payments"),
          discount: "Free"
        },
        {
          name: t("plans:options.proFeedback")
        },
        {
          name: t("plans:options.dailyData"),
          isLighter: true,
          tooltipImage: "/static/img/controlCenter.png"
        },
        {
          name: t("plans:options.posIntegration"),
          isLighter: true,
          tooltipImage: "/static/img/integrations.png"
        },
        {
          name: t("plans:options.archivedData"),
          isLighter: true,
          tooltipImage: "/static/img/documents.png"
        },
        {
          name: t("plans:options.hrAndPeopleManagement"),
          isLighter: true
        },
        {
          name: t("plans:options.supplyAutomation"),
          isLighter: true
        },
        {
          name: t("plans:options.loyaltyProgram"),
          isLighter: true
        },
        {
          name: t("plans:options.clientInteraction"),
          isLighter: true
        },
        {
          name: t("plans:options.photoshoot"),
          isLighter: true
        },
        {
          name: t("plans:options.mysteryShopping"),
          isLighter: true
        },
        {
          name: t("plans:options.widget"),
          isLighter: true
        }
      ];
    default:
      return [];
  }
};
