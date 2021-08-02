import {
  API_URL,
  APP_URL,
  SUBSCRIPTION_ENTREPRISE_URL,
  SUBSCRIPTION_PLANS,
  SUBSCRIPTION_PLANS_SLUGS
} from "consts";

export const getPlanSlug = (config = {}) => {
  const { planName, billingInterval } = config || {};
  return SUBSCRIPTION_PLANS_SLUGS[billingInterval][planName];
};

export const getPlanPrice = ({ plans, planName, billingInterval }) => {
  const planSlug = getPlanSlug({
    planName: planName.toLowerCase(),
    billingInterval
  });

  const relatedPlan =
    plans && plans.find(p => p.getIn(["attributes", "slug"]) === planSlug);

  if (!relatedPlan) return null;

  const amountInCents = relatedPlan.getIn(["attributes", "amountCents"]);
  return amountInCents / 100;
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
