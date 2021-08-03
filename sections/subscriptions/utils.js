import { BASIC_PLAN_NAME } from "consts";

const getCurrentPlanNameBySlug = slug => {
  const [, planName] = slug.split("-");
  return planName;
};

const basicPlan = {
  currentPlanName: BASIC_PLAN_NAME,
  nextPlanName: BASIC_PLAN_NAME
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
