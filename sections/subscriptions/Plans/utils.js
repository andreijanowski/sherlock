export const parsePlan = plan => {
  if (plan && !plan.cancelled) {
    switch (plan.slug) {
      case "sherlock-basic-monthly-eur":
      case "sherlock-basic-yearly-eur": {
        return {
          name: "basic",
          nextPaymentDate: plan.nextPaymentAt,
          interval: plan.interval
        };
      }
      case "sherlock-premium-monthly-eur":
      case "sherlock-premium-yearly-eur": {
        return {
          name: "premium",
          nextPaymentDate: plan.nextPaymentAt,
          interval: plan.interval
        };
      }
      default: {
        return {
          name: "professional",
          nextPaymentDate: plan.nextPaymentAt,
          interval: plan.interval
        };
      }
    }
  }
  return {
    name: "essential"
  };
};
