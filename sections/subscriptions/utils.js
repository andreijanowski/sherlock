const getCurrentPlanNameBySlug = slug => {
  switch (slug) {
    case "sherlock-basic-monthly-eur":
    case "sherlock-basic-yearly-new-eur": {
      return "basic";
    }
    case "sherlock-premium-monthly-new-eur":
    case "sherlock-premium-yearly-eur": {
      return "premium";
    }
    default: {
      return "professional";
    }
  }
};

const essentialPlan = {
  currentPlanName: "essential",
  nextPlanName: "essential"
};

export const getPlanName = plan => {
  if (plan) {
    const currentPlan = getCurrentPlanNameBySlug(
      plan.getIn(["attributes", "slug"])
    );
    if (plan.getIn(["attributes", "cancelAt"])) {
      if (
        new Date(plan.getIn(["attributes", "cancelAt"])).getTime() <
        new Date().getTime()
      ) {
        return essentialPlan;
      }
      return {
        currentPlanName: currentPlan,
        nextPlanName: "essential"
      };
    }
    return {
      currentPlanName: currentPlan,
      nextPlanName: currentPlan
    };
  }
  return essentialPlan;
};
