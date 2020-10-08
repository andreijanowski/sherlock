const getCurrentPlanNameBySlug = slug => {
  switch (slug) {
    case "sherlock-essential-monthly-eur":
    case "sherlock-essential-yearly-eur": {
      return "essential";
    }
    case "sherlock-premium-monthly-new-eur":
    case "sherlock-premium-yearly-eur": {
      return "premium";
    }
    default: {
      return "basic";
    }
  }
};

const basicPlan = {
  currentPlanName: "basic",
  nextPlanName: "basic"
};

export const getPlanName = plan => {
  if (plan) {
    const currentPlan = getCurrentPlanNameBySlug(
      plan.getIn(["attributes", "slug"])
    );
    return {
      currentPlanName: currentPlan,
      nextPlanName: currentPlan
    };
  }
  return basicPlan;
};
