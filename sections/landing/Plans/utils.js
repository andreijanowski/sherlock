export const generatePlanOptionsList = (planName, t) => {
  switch (planName) {
    case "essential":
      return [
        {
          name: t(`plans.options.website`)
        },
        {
          name: t(`plans.options.mobileApp`)
        },
        {
          name: t(`plans.options.paidBooking`),
          discount: "1€"
        },
        {
          name: t(`plans.options.delivery`),
          discount: "7%"
        },
        {
          name: t(`plans.options.takeAway`),
          discount: "7%"
        },
        {
          name: t(`plans.options.catering`),
          discount: "10%"
        },
        {
          name: t(`plans.options.privatization`),
          discount: "10%"
        },
        {
          name: t(`plans.options.payments`),
          discount: "2.9%"
        },
        {
          name: t(`plans.options.proFeedback`)
        },
        {
          name: t(`plans.options.widget`),
          isLighter: true
        }
      ];
    case "basic":
      return [
        {
          name: t(`plans.options.website`)
        },
        {
          name: t(`plans.options.mobileApp`)
        },
        {
          name: t(`plans.options.bookings`),
          discount: "Free"
        },
        {
          name: t(`plans.options.delivery`),
          discount: "3.5%"
        },
        {
          name: t(`plans.options.takeAway`),
          discount: "3.5%"
        },
        {
          name: t(`plans.options.catering`),
          discount: "5%"
        },
        {
          name: t(`plans.options.privatization`),
          discount: "5%"
        },
        {
          name: t(`plans.options.payments`),
          discount: "2.9%"
        },
        {
          name: t(`plans.options.proFeedback`)
        },
        {
          name: t(`plans.options.monthlyData`)
        },
        {
          name: t(`plans.options.posIntegration`)
        },
        {
          name: t(`plans.options.widget`),
          isLighter: true
        }
      ];
    case "premium":
      return [
        {
          name: t(`plans.options.website`)
        },
        {
          name: t(`plans.options.mobileApp`)
        },
        {
          name: t(`plans.options.bookings`),
          discount: "Free"
        },
        {
          name: t(`plans.options.delivery`),
          discount: "2%"
        },
        {
          name: t(`plans.options.takeAway`),
          discount: "2%"
        },
        {
          name: t(`plans.options.catering`),
          discount: "3.5%"
        },
        {
          name: t(`plans.options.privatization`),
          discount: "3.5%"
        },
        {
          name: t(`plans.options.payments`),
          discount: "2.9%"
        },
        {
          name: t(`plans.options.proFeedback`)
        },
        {
          name: t(`plans.options.weeklyData`)
        },
        {
          name: t(`plans.options.posIntegration`)
        },
        {
          name: t(`plans.options.archivedData`)
        },
        {
          name: t(`plans.options.photoshoot`)
        },
        {
          name: t(`plans.options.mysteryShopping`),
          isLighter: true
        },
        {
          name: t(`plans.options.widget`),
          isLighter: true
        }
      ];
    case "professional":
      return [
        {
          name: t(`plans.options.website`)
        },
        {
          name: t(`plans.options.mobileApp`)
        },
        {
          name: t(`plans.options.bookings`),
          discount: "Free"
        },
        {
          name: t(`plans.options.delivery`),
          discount: "Free"
        },
        {
          name: t(`plans.options.takeAway`),
          discount: "Free"
        },
        {
          name: t(`plans.options.catering`),
          discount: "Free"
        },
        {
          name: t(`plans.options.privatization`),
          discount: "Free"
        },
        {
          name: t(`plans.options.payments`),
          discount: "Free"
        },
        {
          name: t(`plans.options.proFeedback`)
        },
        {
          name: t(`plans.options.dailyData`)
        },
        {
          name: t(`plans.options.posIntegration`)
        },
        {
          name: t(`plans.options.archivedData`)
        },
        {
          name: t(`plans.options.hrAndPeopleManagement`)
        },
        {
          name: t(`plans.options.supplyAutomation`)
        },
        {
          name: t(`plans.options.loyaltyProgram`)
        },
        {
          name: t(`plans.options.clientInteraction`)
        },
        {
          name: t(`plans.options.photoshoot`)
        },
        {
          name: t(`plans.options.mysteryShopping`),
          isLighter: true
        },
        {
          name: t(`plans.options.widget`),
          isLighter: true
        }
      ];
    default:
      return [];
  }
};
