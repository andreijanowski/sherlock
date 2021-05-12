import {
  API_URL,
  APP_URL,
  SUBSCRIPTION_ENTREPRISE_URL,
  SUBSCRIPTION_PLANS
} from "consts";

export const getNewPlanSlug = (config = {}) => {
  const { planName, billingInterval } = config || {};
  const isPremiumMonthly =
    planName === "premium" && billingInterval === "month";
  let newPlanSlug = `sherlock-${planName}-${billingInterval}ly-eur`;

  if (isPremiumMonthly) {
    newPlanSlug = `sherlock-${planName}-${billingInterval}ly-new-eur`;
  }

  return newPlanSlug;
};

/**
 * @param {Object} config
 * @param {String} config.lng
 * @param {String} config.planName
 */
export const planLoginPath = (config = {}) => {
  const { lng = "", planName = "" } = config;

  if (planName === SUBSCRIPTION_PLANS.ENTREPRISE) {
    return SUBSCRIPTION_ENTREPRISE_URL;
  }

  const plan =
    planName === SUBSCRIPTION_PLANS.ESSENTIAL ||
    planName === SUBSCRIPTION_PLANS.PREMIUM
      ? planName.toLowerCase()
      : "basic";

  return `${API_URL}/users/sign_up?locale=${lng}&redirect_url=${APP_URL}/instant-login?plan=${plan}`;
};
