const getCurrentPlanNameBySlug = slug => {
  switch (slug) {
    case "sherlock-basic-monthly-eur":
    case "sherlock-basic-yearly-eur": {
      return "basic";
    }
    case "sherlock-premium-monthly-eur":
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
    const currentPlan = getCurrentPlanNameBySlug(plan.slug);
    if (plan.cancelAt) {
      if (new Date(plan.cancelAt).getTime() < new Date().getTime()) {
        return essentialPlan;
      }
      return {
        currentPlanName: currentPlan,
        nextPlanName: "essential"
      };
    }
    // if (
    //   !plan.nextPaymentAt &&
    //   new Date(plan.trialEndsAt).getTime() < new Date().getTime()
    // ) {
    //   return essentialPlan;
    // }
    return {
      currentPlanName: currentPlan,
      nextPlanName: currentPlan
    };
  }
  return essentialPlan;
};
